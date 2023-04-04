import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment monitoring page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=monitoring`;

const loggedIn = true;

const graphTitles = [
  "database-connections",
  "database-queries",
  "query-latency",
  "cpu-usage",
  "memory-usage",
  "disk-usage",
  "disk-io",
  "network-data",
];

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-monitoring", "Monitoring"),
    ...graphTitles.map(graphTitle =>
      newExpectationWithScrollIntoView(
        `should scroll to ${graphTitle}`,
        `[data-cy=${graphTitle}]`,
        beVisible,
        true,
      ),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
