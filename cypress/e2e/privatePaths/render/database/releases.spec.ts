import { runTestsForDevices } from "../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";
import {
  testDBHeaderWithBranch,
  testMobileDBHeaderNav,
} from "../../../utils/sharedTests/dbHeaderNav";

const pageName = "Releases page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const dbName = "us_jails";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/releases`;

const loggedIn = true;
const skipNavbar = false;
const skipFooter = true;

describe(pageName, () => {
  const notExist = newShouldArgs("not.exist");
  const beVisible = newShouldArgs("be.visible");

  const commonTests = [
    newExpectation(
      "should not find empty releases message",
      "[data-cy=release-list-no-releases]",
      notExist,
    ),
    newExpectation(
      "should have at least one tag",
      "[data-cy=release-list-item]",
      newShouldArgs("be.visible.and.have.length.of.at.least", 1),
    ),
    newExpectation(
      "should have release header",
      "[data-cy=release-list-header]",
      beVisible,
    ),
    newExpectation(
      "should find latest release label",
      "[data-cy=release-list-latest-label]",
      beVisible,
    ),
    newExpectation(
      "should find first release name",
      "[data-cy=release-item-release-name]:first",
      beVisible,
    ),
    newExpectation(
      "should find first release date",
      "[data-cy=release-list-item-date]:first",
      beVisible,
    ),
  ];

  const desktopAndIpadTests = (isIpad = false) => [
    ...testDBHeaderWithBranch(ownerName, depName, dbName, isIpad),
    ...commonTests,
  ];

  const mobileTests = [
    ...testMobileDBHeaderNav(ownerName, depName, dbName),
    ...commonTests,
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
