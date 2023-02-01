import { beVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Deployments page";
const currentPage = "/deployments";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    newExpectation(
      "should have deployments header",
      "#main-content",
      newShouldArgs("be.visible.and.contain", "My Deployments"),
    ),
    newExpectation(
      "should not have no deployments message",
      "[data-cy=no-deployments-msg]",
      newShouldArgs("not.exist"),
    ),
    newExpectation(
      "should have no subscription banner",
      "[data-cy=no-subscription-banner]",
      beVisible,
    ),
    newExpectation(
      "should have reload button",
      "[data-cy=reload-button]",
      beVisible,
    ),
    newExpectation(
      "should have create deployment button",
      "[data-cy=create-deployment-button]",
      beVisible,
    ),
    newExpectation(
      "should have deployments table",
      "[data-cy=deployments-table]",
      beVisible,
    ),
    newExpectation(
      "should have at least one row",
      "[data-cy=deployment-row]",
      newShouldArgs("be.visible.and.have.length.of.at.least", 1),
    ),
  ];
  const devices = desktopDevicesForAppLayout(
    pageName,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
