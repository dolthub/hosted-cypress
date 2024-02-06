import { testDBHeaderWithBranch } from "@sharedTests/dbHeaderNav";
import {
  beVisible,
  haveLengthAtLeast,
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { changeBranch } from "@utils/sharedTests/changeBranch";

const pageName = "Pull requests page";
const currentOwner = "automated_testing";
const currentDep = "us-jails";
const dbName = "us-jails";
const pullsPage = `deployments/${currentOwner}/${currentDep}/database/${dbName}/pulls`;
const currentPage = `${pullsPage}?filter=all`;
const destinationBranch = "delete-rows";

const loggedIn = true;
const databasePage = true;
const skip = false;
const hasDocs = true;

describe(pageName, () => {
  const changeBranchParams = {
    isLeftNavClosed: true,
    currentTabDataCy: "pull-requests-table",
    destinationBranch,
    destinationURL: `/${pullsPage}?refName=${destinationBranch}`,
  };

  const desktopAndIpadTests = (isIpad = false) => [
    ...testDBHeaderWithBranch(
      currentDep,
      currentOwner,
      dbName,
      hasDocs,
      isIpad,
    ),
    ...changeBranch(changeBranchParams),
    shouldNotExist("pull-requests-no-pulls"),
    shouldBeVisible("pull-search-input"),
    newExpectation(
      "should find at least 1 pull",
      "[data-cy=pull-requests-table] > li",
      haveLengthAtLeast(1),
    ),
    newExpectation(
      "should find pull with ID 1 with pull state icon",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-icon]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 1 with pull title",
      "[data-cy=pull-requests-row-1] [data-cy=pull-title]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 1 with pull id",
      "[data-cy=pull-requests-row-1] [data-cy=pull-id]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 1 with pull creator",
      "[data-cy=pull-requests-row-1] [data-cy=pull-creator]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 1 with created time",
      "[data-cy=pull-requests-row-1] [data-cy=created-time]",
      beVisible,
    ),
    newExpectation(
      "should find pull with ID 1 with comment count",
      "[data-cy=pull-requests-row-1] [data-cy=comment-count]",
      beVisible,
    ),
  ];

  const devices = desktopDevicesForAppLayout(
    pageName,
    desktopAndIpadTests(),
    databasePage,
  );
  /* 
    TODO: mobile pull request page test
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentDep, currentPage, true, true),
    ), 
    */
  // ];

  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
