import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment workbench page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=configuration`;

const loggedIn = true;

const SupportedOverrides = [
  "behavior_auto_commit",
  "behavior_read_only",
  "behavior_sysvar_persistence",
  "behavior_disable_multistatements",
  "listener_max_connections",
  "listener_read_timeout_millis",
  "listener_write_timeout_millis",
  "perf_query_parallelism",
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("configuration-header", "Configuration"),
    ...SupportedOverrides.map(supportedOverride =>
      newExpectationWithScrollIntoView(
        `should scroll to ${supportedOverride}`,
        `[data-cy=${supportedOverride}]`,
        beVisible,
        true,
      ),
    ),
  ];

  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices });
});
