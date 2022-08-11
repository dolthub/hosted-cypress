import { runTestsForDevices } from "../../../utils";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";
import {
  testMobileRepoHeaderNav,
  testRepoHeaderWithBranch,
} from "../../../utils/sharedTests/dbHeaderNav";

const pageName = "Docs (no docs exist) page";
const ownerName = "dolthub";
const depName = "us-jails";
const dbName = "us_jails";
const currentBranch = "main";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/doc/${currentBranch}`;

const loggedIn = true;
const skipNavbar = false;
const skipFooter = true;

describe(pageName, () => {
  const notExist = newShouldArgs("not.exist");

  const commonTests = [
    newExpectation(
      "should not find doc markdown",
      "[data-cy=repo-doc-markdown]",
      notExist,
    ),
    newExpectation(
      "should have no docs header",
      "[data-cy=no-docs-found]",
      newShouldArgs(
        "be.visible.and.contain",
        `No docs found for ${ownerName}/${depName}`,
      ),
    ),
    newExpectation(
      "should have instructions to add a doc",
      "[data-cy=add-docs-instructions]",
      newShouldArgs("be.visible.and.contain", "Adding a doc using SQL"),
    ),
  ];

  const desktopAndIpadTests = (isIpad = false) => [
    ...testRepoHeaderWithBranch(ownerName, depName, dbName, isIpad),
    ...commonTests,
  ];

  const mobileTests = [
    ...testMobileRepoHeaderNav(ownerName, depName, dbName),
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
    iPad2ForAppLayout(
      pageName,
      desktopAndIpadTests(true),
      skipNavbar,
      skipFooter,
      loggedIn,
    ),
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
