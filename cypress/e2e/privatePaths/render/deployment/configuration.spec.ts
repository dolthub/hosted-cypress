import { allDevicesForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment configuration page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=configuration`;

const loggedIn = true;

const supportedOverrides = [
  "behavior_auto_commit",
  "behavior_dolt_transaction_commit",
  "behavior_read_only",
  "behavior_sysvar_persistence",
  "behavior_disable_multistatements",
  "listener_max_connections",
  "listener_read_timeout_millis",
  "listener_write_timeout_millis",
  "perf_query_parallelism",
  "max_logged_query_len",
  "log_level",
];

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-configuration", "Configuration"),
    shouldFindAndContain("configuration-header", "Configuration"),
    shouldNotExist("must-admin-msg"),
    shouldNotExist("must-started-msg"),
    ...supportedOverrides.map(supportedOverride =>
      newExpectationWithScrollIntoView(
        `should scroll to ${supportedOverride}`,
        `[data-cy=${supportedOverride}]`,
        beVisible,
        true,
      ),
    ),
    newExpectation(
      "should find multiple inputs in config table",
      "[data-cy=config-table] input",
      newShouldArgs(
        "be.visible.and.have.length.of.at.least",
        supportedOverrides.length,
      ),
    ),
    shouldBeVisible("save-changes-button"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
