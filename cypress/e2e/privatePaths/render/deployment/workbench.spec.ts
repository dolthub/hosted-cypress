import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { notExist } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment workbench page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=workbench`;

const loggedIn = true;

describe(pageName, () => {
  const tests = [
    newExpectation(
      "should have workbench section",
      "[data-cy=deployment-workbench]",
      newShouldArgs("be.visible.and.contain", "Connect to Web Workbench"),
    ),
    newExpectation(
      "should have list of databases",
      "[data-cy=workbench-database-list] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 1),
    ),
    newExpectation(
      "should not have auth directions",
      "[data-cy=workbench-auth-directions]",
      notExist,
    ),
    newExpectation(
      "should not have no databases message",
      "[data-cy=workbench-no-databases]",
      notExist,
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
