import {
  testDBHeaderWithBranch,
  testMobileDBHeaderNav,
} from "@sharedTests/dbHeaderNav";
import {
  tableExpectations,
  testQueryCatalogSection,
  testSchemaSection,
  testViewsSection,
} from "@sharedTests/dbLeftNav";
import { testSqlConsole, testSqlConsoleMobile } from "@sharedTests/sqlEditor";
import {
  iPad2ForAppLayout,
  iPhoneXForAppLayout,
  macbook15ForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { Tests } from "@utils/types";

const pageName = "Default database page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const dbName = "us_jails";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}`;

const loggedIn = true;
const hasBranch = true;
const testTable = "incidents";

describe(pageName, () => {
  const beVisible = newShouldArgs("be.visible");
  const notExist = newShouldArgs("not.exist");

  const commonTests = [
    newExpectation(
      "should not find empty database",
      "[data-cy=db-data-table-empty]",
      notExist,
    ),
  ];

  const desktopAndIpadTests = (isIpad = false): Tests => [
    ...commonTests,
    newExpectation(
      "should not find database table data",
      "[data-cy=db-data-table]",
      notExist,
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=db-doc-markdown]",
      beVisible,
    ),
    ...testDBHeaderWithBranch(ownerName, depName, dbName, isIpad),
    // TODO: Once writes are allowed, make loggedIn = true
    ...tableExpectations(true, true, 3, testTable),
    // ...testClickDeleteRow(
    //   "error-modal",
    //   newShouldArgs("be.visible.and.contain", ["No authentication", "sign in"]),
    // ),
    testViewsSection(hasBranch, 0),
    // newExpectationWithClickFlows(
    //   "should show create view button",
    //   "[data-cy=create-view-button]",
    //   beVisible,
    //   [
    //     newClickFlow(
    //       "[data-cy=create-view-button]",
    //       [typingExpectation("testQueryName", "[data-cy=query-name]")],
    //       "[data-cy=close-modal]",
    //     ),
    //   ],
    // ),
    testQueryCatalogSection(hasBranch, 0),
    testSchemaSection(hasBranch, 3, testTable),
    testSqlConsole,
  ];

  const mobileTests = [
    ...commonTests,
    newExpectation(
      "should not find mobile database table data",
      "[data-cy=mobile-db-data-table]",
      notExist,
    ),
    newExpectation(
      "should find doc markdown",
      "[data-cy=db-doc-markdown]",
      beVisible,
    ),
    ...testMobileDBHeaderNav(ownerName, depName, dbName),
    ...tableExpectations(true, false, 3, testTable, true),
    testViewsSection(hasBranch, 0, undefined, true),
    testQueryCatalogSection(hasBranch, 0, undefined, true),
    testSchemaSection(hasBranch, 3, testTable, true),
    newExpectationWithClickFlows(
      "should click button to close db nav",
      "[data-cy=close-table-nav-button]",
      beVisible,
      [
        newClickFlow("[data-cy=close-table-nav-button]", [
          newExpectation(
            "mobile table nav should be closed",
            "[data-cy=close-table-nav-button]",
            notExist,
          ),
        ]),
      ],
    ),
    testSqlConsoleMobile,
  ];

  const skip = false;
  const skipNavbar = false;
  const skipFooter = true;

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

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
