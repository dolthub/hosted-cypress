import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

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
