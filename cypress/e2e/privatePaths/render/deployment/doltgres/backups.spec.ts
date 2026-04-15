import { desktopDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Doltgres deployment backups page";
const ownerName = "automated_testing";
const depName = "doltgres-test";
const currentPage = `/deployments/${ownerName}/${depName}?tab=backups`;

const loggedIn = true;
const skip = false;

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName, false, false, false),
    shouldFindAndContain("active-tab-backups", "Backups"),
    shouldBeVisible("backup-table"),
    newExpectation(
      "should have at least 5 backups",
      "[data-cy=backup-table] > tbody > tr",
      newShouldArgs("be.visible.and.have.length.of.at.least", 5),
    ),
    newExpectation(
      "should have server in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(2)",
      beVisibleAndContain("0"),
    ),
    newExpectation(
      "should have getting_started database in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(3)",
      beVisibleAndContain("getting_started"),
    ),
    newExpectation(
      "should have size in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(4)",
      beVisibleAndContain("KB"),
    ),
    newExpectation(
      "should have created at in each row",
      "[data-cy=backup-table] > tbody > tr > td:nth-child(5)",
      beVisibleAndContain("ago"),
    ),
    newExpectation(
      "should have options dropdown in each row",
      "[data-cy=backup-table] > tbody > tr [data-cy=backup-options-popup]",
      beVisible,
    ),
  ];

  // TODO: Fix for mobile
  const devices = desktopDevicesForAppLayout(pageName, tests);

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
