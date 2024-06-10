import {
  testDBHeaderWithBranch,
  testMobileDBHeaderNav,
} from "@sharedTests/dbHeaderNav";
import {
  tableExpectations,
  testSchemaSection,
  testViewsSection,
} from "@sharedTests/dbLeftNav";
import { testSqlConsole, testSqlConsoleMobile } from "@sharedTests/sqlEditor";
import {
  macbook15ForAppLayout,
  mobileDevicesForAppLayout,
} from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldNotExist,
  shouldTypeString,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Tests } from "@utils/types";

const pageName = "Default database page";
const ownerName = "automated_testing";
const depName = "us-jails";
const dbName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}/database/${dbName}`;

const loggedIn = true;
const skip = false;
const databasePage = true;
const hasBranch = true;
const testTable = "incidents";
const hasDocs = true;

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
    shouldBeVisible("desktop-db-data-table"),
    shouldNotExist("db-doc-markdown"),
    ...testDBHeaderWithBranch(ownerName, depName, dbName, hasDocs, isIpad),
    ...tableExpectations(false, true, 3, testTable),
    testViewsSection(hasBranch, 0),
    newExpectationWithClickFlows(
      "should show create view button",
      "[data-cy=create-view-button]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=create-view-button]",
          [shouldTypeString("query-name", "testQueryName")],
          "[data-cy=close-modal]",
        ),
      ],
    ),
    testSchemaSection(hasBranch, 3, testTable),
    testSqlConsole,
  ];

  const mobileTests = [
    ...commonTests,
    shouldBeVisible("mobile-db-data-table"),
    shouldNotExist("db-doc-markdown"),
    ...testMobileDBHeaderNav(ownerName, depName, dbName),
    ...tableExpectations(true, false, 3, testTable, true),
    testViewsSection(hasBranch, 0, undefined, true),
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

  const devices = [
    macbook15ForAppLayout(pageName, desktopAndIpadTests(), databasePage),
    ...mobileDevicesForAppLayout(pageName, mobileTests, databasePage),
  ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
