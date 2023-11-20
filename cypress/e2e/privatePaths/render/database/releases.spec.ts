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

const pageName = "Releases page";
const ownerName = "automated_testing";
const depName = "us-jails";
const dbName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/releases`;

const loggedIn = true;
const databasePage = true;
const skip = false;
const hasDocs = true;

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
    ...testDBHeaderWithBranch(ownerName, depName, dbName, hasDocs, isIpad),
    ...commonTests,
  ];

  const mobileTests = [
    ...testMobileDBHeaderNav(ownerName, depName, dbName),
    ...commonTests,
  ];

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), databasePage),
    ...mobileDevicesForAppLayout(pageName, mobileTests, databasePage),
  ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
