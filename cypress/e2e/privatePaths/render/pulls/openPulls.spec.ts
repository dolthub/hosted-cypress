import { changeBranch } from "@sharedTests/changeBranch";
import { testDBHeaderWithBranch } from "@sharedTests/dbHeaderNav";
import {
  beVisibleAndContain,
  haveLength,
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page with open pulls";
const currentOwner = "automated_testing";
const currentDep = "us-jails";
const dbName = "us_jails";
const currentPage = `deployments/${currentOwner}/${currentDep}/database/${dbName}/pulls`;

const destinationBranch = "delete-rows";
const changeBranchParams = {
  isLeftNavClosed: true,
  currentTabDataCy: "pull-requests-table",
  destinationBranch,
  destinationURL: `/${currentPage}?refName=${destinationBranch}`,
};

const loggedIn = true;
const skip = false;
const databasePage = true;

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

  const devices = [macbook15ForAppLayout(pageName, tests, databasePage)];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
