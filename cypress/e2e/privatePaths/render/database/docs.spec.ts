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

const pageName = "Docs page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const dbName = "us_jails";
const currentBranch = "main";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}/doc/${currentBranch}`;

const skip = false;
const loggedIn = true;
const databasePage = true;

describe(pageName, () => {
  const notExist = newShouldArgs("not.exist");

  const commonTests = [
    newExpectation(
      "should not have no docs header",
      "[data-cy=no-docs-found]",
      notExist,
    ),
    newExpectation(
      "should not have instructions to add a doc",
      "[data-cy=add-docs-instructions]",
      notExist,
    ),
    newExpectation(
      "should find docs list",
      "[data-cy=db-docs-list] > li",
      newShouldArgs("be.visible.and.have.length", 2),
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=db-doc-markdown]",
      newShouldArgs("be.visible.and.contain", "README.md"),
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
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), databasePage),
    ...mobileDevicesForAppLayout(pageName, mobileTests, databasePage),
  ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
