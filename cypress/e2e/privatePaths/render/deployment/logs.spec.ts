import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment logs page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=logs`;

const loggedIn = true;

const Logs = ["newer-pagination-button", "logs", "older-pagination-button"];

describe(pageName, () => {
  const tests = [
    ...Logs.map(log =>
      newExpectationWithScrollIntoView(
        `should scroll to ${log}`,
        `[data-cy=${log}]`,
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
