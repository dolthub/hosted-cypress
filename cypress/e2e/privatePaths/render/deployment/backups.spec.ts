import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment backups page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=backups`;

const loggedIn = true;
const skip = false;

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-backups", "Backups"),
    shouldBeVisible("backup-table"),
    newExpectation(
      "should have at least 10 backups",
      "[data-cy=backup-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 10),
    ),
    newExpectation(
      "should have us_jails database in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(2)",
      beVisibleAndContain("us_jails"),
    ),
    newExpectation(
      "should have size in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(3)",
      beVisibleAndContain("MB"),
    ),
    newExpectation(
      "should have created at in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(4)",
      beVisibleAndContain("ago"),
    ),
    newExpectation(
      "should have options dropdown in each row",
      "[data-cy=backup-table] > tbody > tr [data-cy=backup-options-popup]",
      beVisible,
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
