import {
  shouldFindAndContain,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page for non-existent database";
const currentOwner = "automated_testing";
const currentDep = "us-jails";
const doesNotExistDB = "doesnotexist";
const currentPage = `deployments/${currentOwner}/${currentDep}/database/${doesNotExistDB}/pulls`;

const loggedIn = true;
const databasePage = true;
const skip = false;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("error-msg", "database not found"),
    shouldNotExist("pull-requests-table"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, databasePage)];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
