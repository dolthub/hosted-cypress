import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { shouldBeVisible } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment backups page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=backups`;

const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("backup-table"),
    newExpectation(
      "should have list of databases",
      "[data-cy=backup-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
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
