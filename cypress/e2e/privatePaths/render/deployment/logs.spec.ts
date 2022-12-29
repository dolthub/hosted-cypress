import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment logs page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=logs`;

const loggedIn = true;

const logDataCys = [
  "newer-pagination-button",
  "logs",
  "older-pagination-button",
];

describe(pageName, () => {
  const tests = [
    ...logDataCys.map(dataCy =>
      newExpectationWithScrollIntoView(
        `should scroll to ${dataCy}`,
        `[data-cy=${dataCy}]`,
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
  // TODO: Logs are slow to load, causing this test to be flaky at times.
  const skip = true;
  runTestsForDevices({ currentPage, devices, skip });
});
