import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment configuration page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=configuration`;

const loggedIn = true;

const supportedOverrides = [
  "behavior_auto_commit",
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
    shouldFindAndContain("configuration-header", "Configuration"),
    ...supportedOverrides.map(supportedOverride =>
      newExpectationWithScrollIntoView(
        `should scroll to ${supportedOverride}`,
        `[data-cy=${supportedOverride}]`,
        beVisible,
        true,
      ),
    ),
    shouldBeVisible("save-changes-button"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
