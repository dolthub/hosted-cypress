import { runTestsForDevices } from "../../../utils";
import { macbook15ForAppLayout } from "../../../utils/devices";
import { newExpectation } from "../../../utils/helpers";
import { testDBHeaderWithBranch } from "../../../utils/sharedTests/dbHeaderNav";
import {
  beVisibleAndContain,
  haveLength,
  shouldBeVisible,
  shouldNotExist,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Pull requests page with open pulls";
const currentOwner = "dolthub";
const currentDep = "us-jails-2";
const dbName = "us_jails";
const currentPage = `deployments/${currentOwner}/${currentDep}/database/${dbName}/pulls`;

describe(pageName, () => {
  const tests = [
    ...testDBHeaderWithBranch(currentDep, currentOwner, dbName),
    shouldNotExist("pull-requests-no-pulls"),
    shouldBeVisible("pull-search-input"),
    newExpectation(
      "should find pull requests table with header",
      "[data-cy=pull-requests-table] > thead > tr > th",
      haveLength(5),
    ),
    newExpectation(
      "should find pull with ID 1 with pull state label",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-label]",
      beVisibleAndContain("Open"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, true, true)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
