import { runTestsForDevices } from "../../../utils";
import { macbook15ForAppLayout } from "../../../utils/devices";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Pull requests page for non-existent deployment";
const currentOwner = "dolthub";
const doesNotExistDep = "doesnt-exist";
const dbName = "us_jails";
const currentPage = `deployments/${currentOwner}/${doesNotExistDep}/database/${dbName}/pulls`;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("404-page", "Database not found"),
    shouldBeVisible("db-404-inner", "dep does not exist message"),
    shouldNotExist("pull-requests-table"),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, true, true)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
