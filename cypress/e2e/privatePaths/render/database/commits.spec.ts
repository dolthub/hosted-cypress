import {
  testDBHeaderWithBranch,
  testMobileDBHeaderNav,
} from "@sharedTests/dbHeaderNav";
import {
  macbook15ForAppLayout,
  mobileDevicesForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  notExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Commit log page";
const ownerName = "automated_testing";
const depName = "us-jails";
const dbName = "us_jails";
const currentBranch = "main";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/commits/${currentBranch}`;

const loggedIn = true;
const databasePage = true;
const skip = false;
const hasDocs = true;

describe(pageName, () => {
  const commonTests = [
    newExpectation(
      "should not find empty commits message",
      "[data-cy=commit-log-no-commits]",
      notExist,
    ),
    newExpectation(
      "should find commits list with at least 3 commits",
      "[data-cy=commit-log-commits-list] > li",
      newShouldArgs("be.visible.and.have.length.of.at.least", 3),
    ),
    newExpectation(
      "should find first commit date",
      "[data-cy=commit-log-item-date]:first",
      beVisible,
    ),
  ];

  const desktopAndIpadTests = (isIpad = false) => [
    ...testDBHeaderWithBranch(ownerName, depName, dbName, hasDocs, isIpad),
    ...commonTests,
    newExpectation(
      "should find first commit commit links",
      "[data-cy=commit-log-item]:first a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-id-desktop]:first",
      beVisible,
    ),
  ];

  const mobileTests = [
    ...testMobileDBHeaderNav(ownerName, depName, dbName),
    ...commonTests,
    newExpectation(
      "should find first commit commit ID",
      "[data-cy=commit-log-id-mobile]:first",
      beVisible,
    ),
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), databasePage),
    ...mobileDevicesForAppLayout(pageName, mobileTests, databasePage),
  ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
