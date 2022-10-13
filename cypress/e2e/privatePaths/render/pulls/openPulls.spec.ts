import { runTestsForDevices } from "../../../utils";
import { macbook15ForAppLayout } from "../../../utils/devices";
import { newExpectation } from "../../../utils/helpers";
import { changeBranch } from "../../../utils/sharedTests/changeBranch";
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

const destinationBranch = "delete-rows";
const changeBranchParams = {
  isLeftNavClosed: true,
  currentTabDataCy: "pull-requests-table",
  destinationBranch,
  destinationURL: `/${currentPage}?refName=${destinationBranch}`,
};

describe(pageName, () => {
  const tests = [
    ...testDBHeaderWithBranch(currentDep, currentOwner, dbName),
    ...changeBranch(changeBranchParams),
    shouldNotExist("pull-requests-no-pulls"),
    shouldBeVisible("pull-search-input"),
    newExpectation(
      "should find pull requests table with header",
      "[data-cy=pull-requests-table] > thead > tr > th",
      haveLength(5),
    ),
    newExpectation(
      "should find first pull with pull state label",
      "[data-cy=pull-requests-table] > tbody > tr:first [data-cy=pull-state-label]",
      beVisibleAndContain("Open"),
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, false, true, true)];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
