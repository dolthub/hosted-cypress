import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment logs page";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}?tab=logs`;

const loggedIn = true;

// TODO: Logs query is too slow
const skip = false;

const logDataCys = [
  "newer-pagination-button",
  "logs",
  "older-pagination-button",
];

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-logs", "Logs"),
    ...logDataCys.map(dataCy =>
      newExpectationWithScrollIntoView(
        `should scroll to ${dataCy}`,
        `[data-cy=${dataCy}]`,
        beVisible,
        true,
        false,
        10000,
      ),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
