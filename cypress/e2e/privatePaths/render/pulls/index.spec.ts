import { testDBHeaderWithBranch } from "@sharedTests/dbHeaderNav";
import {
  beVisible,
  haveLength,
  haveLengthAtLeast,
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pull requests page";
const currentOwner = "dolthub";
const currentDep = "us-jails-2";
const dbName = "us_jails";
const pullsPage = `deployments/${currentOwner}/${currentDep}/database/${dbName}/pulls`;
const currentPage = `${pullsPage}?filter=all`;
// const destinationBranch = "delete-rows";

describe(pageName, () => {
  // const changeBranchParams = {
  //   isLeftNavClosed: true,
  //   currentTabDataCy: "pull-requests-table",
  //   destinationBranch,
  //   destinationURL: `/${pullsPage}?refName=${destinationBranch}`,
  // };

  const desktopAndIpadTests = (isIpad = false) => [
    ...testDBHeaderWithBranch(currentDep, currentOwner, dbName, isIpad),
    // TODO: Uncomment when this issue is fixed https://github.com/dolthub/dolthub-issues/issues/343
    // ...changeBranch(changeBranchParams),
    shouldNotExist("pull-requests-no-pulls"),
    shouldBeVisible("pull-search-input"),
    newExpectation(
      "should find pull requests table with header",
      "[data-cy=pull-requests-table] > thead > tr > th",
      haveLength(5),
    ),
    newExpectation(
      "should find at least 5 pulls",
      "[data-cy=pull-requests-table] > tbody > tr",
      haveLengthAtLeast(5),
    ),
    newExpectationWithScrollIntoView(
      `should scroll to pull-requests-row-1`,
      "[data-cy=pull-requests-row-1]",
      beVisible,
      true,
    ),
    newExpectation(
      "should find pull with ID 1 with 5 columns",
      "[data-cy=pull-requests-row-1] > td",
      haveLength(5),
    ),
    newExpectation(
      "should find pull with ID 1 with one link",
      "[data-cy=pull-requests-row-1] > td a",
      haveLength(1),
    ),
    newExpectation(
      "should find pull with ID 1 with pull state label",
      "[data-cy=pull-requests-row-1] [data-cy=pull-state-label]",
      beVisible,
    ),
  ];

  const devices = desktopDevicesForAppLayout(
    pageName,
    desktopAndIpadTests(),
    false,
    true,
    true,
  );
  /* 
    TODO: mobile pull request page test
    iPhoneXForAppLayout(
      pageName,
      mobileTests(currentOwner, currentDep, currentPage, true, true),
    ), 
    */
  // ];
  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
