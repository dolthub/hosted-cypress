import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindCheckbox,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment workbench page";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}?tab=workbench`;

const loggedIn = true;

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-settings", "Settings"),
    shouldFindAndContain("deployment-workbench", "Workbench"),
    newExpectation(
      "should have list of databases",
      "[data-cy=workbench-database-list] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 1),
    ),
    shouldBeVisible("database-writes-enabled"),
    shouldNotExist("writes-not-enabled"),
    shouldBeVisible("enable-writes-form"),
    ...shouldFindCheckbox("writes-enabled-checkbox", true),
    shouldNotExist("workbench-auth-directions"),
    shouldNotExist("workbench-no-databases"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
