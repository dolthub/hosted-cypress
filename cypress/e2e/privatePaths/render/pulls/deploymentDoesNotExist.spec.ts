import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page for non-existent deployment";
const currentOwner = "automated_testing";
const doesNotExistDep = "doesnt-exist";
const dbName = "us-jails";
const currentPage = `deployments/${currentOwner}/${doesNotExistDep}/database/${dbName}/pulls`;

const loggedIn = true;
const skip = false;
const databasePage = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("404-page", "Database not found"),
    shouldBeVisible("db-404-inner", "dep does not exist message"),
    shouldNotExist("pull-requests-table"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, databasePage)];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
