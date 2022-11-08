import {
  testDBHeaderWithBranch,
  testMobileDBHeaderNav,
} from "@sharedTests/dbHeaderNav";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Commit log page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const dbName = "us_jails";
const currentBranch = "main";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/commits/${currentBranch}`;

const loggedIn = true;
const skipNavbar = false;
const skipFooter = true;

describe(pageName, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

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
    ...testDBHeaderWithBranch(ownerName, depName, dbName, isIpad),
    ...commonTests,
    newExpectation(
      "should find first commit commit links",
      "[data-cy=commit-log-item]:first a",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    // newExpectation(
    //   "should find csv download icon",
    //   "[data-cy=dump-csv]",
    //   beVisible,
    // ),
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
    macbook15ForAppLayout(
      pageName,
      desktopAndIpadTests(),
      skipNavbar,
      skipFooter,
      loggedIn,
    ),
    iPad2ForAppLayout(pageName, mobileTests, skipNavbar, skipFooter, loggedIn),
    iPhoneXForAppLayout(
      pageName,
      mobileTests,
      skipNavbar,
      skipFooter,
      loggedIn,
    ),
  ];

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
