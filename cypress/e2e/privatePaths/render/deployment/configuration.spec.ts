import { allDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  notExist,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment database page, configuration section";
const ownerName = "automated_testing";
const depName = "us-jails";
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
    shouldFindAndContain("active-tab-database", "Database"),
    shouldBeVisible("configuration-header"),
    shouldNotExist("must-admin-msg"),
    shouldNotExist("must-started-msg"),
    ...supportedOverrides.map(supportedOverride =>
      newExpectation(
        `should scroll to ${supportedOverride}`,
        `[data-cy=${supportedOverride}]`,
        beVisible,
      ),
    ),
    newExpectationWithClickFlows(
      "should click edit config",
      "[data-cy=edit-config-button]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=edit-config-button]",
          [
            newExpectation(
              "should find multiple inputs in config table",
              "[data-cy=config-table] input",
              newShouldArgs(
                "be.visible.and.have.length.of.at.least",
                supportedOverrides.length,
              ),
            ),
            shouldBeVisible("save-changes-button"),
          ],
          "[data-cy=cancel-button]",
        ),
      ],
    ),
    newExpectation(
      "should no multiple inputs after cancel",
      "[data-cy=config-table] input",
      notExist,
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
