import { changeBranch } from "@sharedTests/changeBranch";
import { testDBHeaderWithBranch } from "@sharedTests/dbHeaderNav";
import {
  beVisible,
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15ForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page with open pulls";
const currentOwner = "automated_testing";
const currentDep = "us-jails";
const dbName = "us-jails";
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
const hasDocs = true;

describe(pageName, () => {
  const tests = [
    ...testDBHeaderWithBranch(currentDep, currentOwner, dbName, hasDocs),
    ...changeBranch(changeBranchParams),
    shouldNotExist("pull-requests-no-pulls"),
    shouldBeVisible("pull-search-input"),
    newExpectation(
      "should find pull with ID 1 with pull state icon",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-icon]",
      beVisible,
    ),
  ];

  const devices = [macbook15ForAppLayout(pageName, tests, databasePage)];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
