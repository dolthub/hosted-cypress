import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  shouldFindAndContain,
  shouldFindAndScrollTo,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment monitoring page";
const ownerName = "automated_testing";
const depName = "us-jails";
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
    ...graphTitles.map(graphTitle => shouldFindAndScrollTo(graphTitle)),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
