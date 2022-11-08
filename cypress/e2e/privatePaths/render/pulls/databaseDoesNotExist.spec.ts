import {
  shouldFindAndContain,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page for non-existent database";
const currentOwner = "dolthub";
const currentDep = "us-jails-2";
const doesNotExistDB = "doesnotexist";
const currentPage = `deployments/${currentOwner}/${currentDep}/database/${doesNotExistDB}/pulls`;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("error-msg", "database not found"),
    shouldNotExist("pull-requests-table"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, true, true)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});