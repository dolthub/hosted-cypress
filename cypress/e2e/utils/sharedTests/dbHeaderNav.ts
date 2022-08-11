import { newExpectation, newShouldArgs } from "../helpers";
import { Expectation, ShouldArgs, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notBeVisible = newShouldArgs("not.be.visible");

// DATABASE DROPDOWN CLICK FLOW

// export const conditionalReadMeTest = (hasDocs: boolean) => {
//   const docsExpectation: Expectation = hasDocs
//     ? newExpectation(
//         "should not have README link",
//         "[data-cy=dropdown-new-docs-link]",
//         newShouldArgs("not.exist"),
//       )
//     : newExpectation(
//         "should have a create new readme link",
//         "[data-cy=dropdown-new-docs-link]",
//         beVisible,
//       );

//   return docsExpectation;
// };

// export const databaseDropdownClickFlow = (
//   loggedIn: boolean,
//   hasDocs: boolean,
// ) =>
//   newClickFlow(
//     "[data-cy=repo-dropdown-button]",
//     loggedIn
//       ? [
//           newExpectation(
//             "should have a create new table link",
//             "[data-cy=dropdown-create-new-table-link]",
//             beVisible,
//           ),
//           newExpectation(
//             "should have a upload a file link",
//             "[data-cy=dropdown-upload-a-file-link]",
//             beVisible,
//           ),
//           newExpectation(
//             "should have a create new issue link",
//             "[data-cy=dropdown-new-issue-link]",
//             beVisible,
//           ),
//           newExpectation(
//             "should have a create new pull request link",
//             "[data-cy=dropdown-new-pull-request-link]",
//             beVisible,
//           ),
//           conditionalReadMeTest(hasDocs),
//         ]
//       : [
//           newExpectation(
//             "should have a create new issue link",
//             "[data-cy=dropdown-new-issue-link]",
//             beVisible,
//           ),
//           newExpectation(
//             "should have a create new pull request link",
//             "[data-cy=dropdown-new-pull-request-link]",
//             beVisible,
//           ),
//         ],
//     "[data-cy=repo-dropdown-button]",
//   );

export const testTabs = (visibility: ShouldArgs): Expectation[] => {
  const tabsVisibility = visibility.chainer === "be.visible" ? "" : "not ";
  return [
    // DATABASE TAB
    newExpectation(
      `should ${tabsVisibility}have Database tab`,
      "[data-cy=repo-database-tab]",
      visibility,
    ),

    // ABOUT TAB

    newExpectation(
      `should ${tabsVisibility}have About tab`,
      "[data-cy=repo-about-tab]",
      visibility,
    ),

    // COMMIT LOG TAB
    newExpectation(
      `should ${tabsVisibility}have Commit Log tab`,
      "[data-cy=repo-commit-log-tab]",
      visibility,
    ),

    // RELEASES TAB

    newExpectation(
      `should ${tabsVisibility}have Tag List tab`,
      "[data-cy=repo-releases-tab]",
      visibility,
    ),

    // PULL REQUESTS TAB

    // newExpectation(
    //   `should ${tabsVisibility}have Pull Requests tab`,
    //   "[data-cy=repo-pull-requests-tab]",
    //   visibility,
    // ),
  ];
};

// SETTINGS TAB

// export const testRepoSettingsTab = newExpectation(
//   "should have Repo Settings section for user with write perms",
//   "[data-cy=repo-settings-tab]",
//   beVisible,
// );

export const testCommonHeader = (
  ownerName: string,
  depName: string,
  dbName: string,
): Expectation[] => [
  newExpectation(
    "should have database header",
    "[data-cy=repository-page-header]",
    beVisible,
  ),
  newExpectation(
    "should have owner's name",
    "[data-cy=repo-breadcrumbs]",
    newShouldArgs("be.visible.and.contain", ownerName),
  ),
  newExpectation(
    "should have deployment's name",
    "[data-cy=repo-breadcrumbs]",
    newShouldArgs("be.visible.and.contain", depName),
  ),
  newExpectation(
    "should have database's name",
    "[data-cy=repo-db-breadcrumb-link]",
    newShouldArgs("be.visible.and.contain", dbName),
  ),
  // newExpectation(
  //   "should have repo last updated",
  //   "[data-cy=updated-at]",
  //   newShouldArgs("be.visible"),
  // ),
  // newExpectation(
  //   "should have repo's size",
  //   "[data-cy=repo-size]",
  //   newShouldArgs("be.visible"),
  // ),
  // newExpectation(
  //   "should have repo star button",
  //   "[data-cy=repo-star]",
  //   beVisible,
  // ),
  // newExpectation(
  //   "should have repo fork button",
  //   "[data-cy=repo-fork-button]",
  //   beVisible,
  // ),
];

export const testRepoHeaderForAll = (
  ownerName: string,
  depName: string,
  dbName: string,
  // hasDocs: boolean,
  isIpad = false,
): Tests => {
  const loggedOutRepoHeaderTests = isIpad
    ? [
        ...testCommonHeader(depName, ownerName, dbName),
        newExpectation(
          "should have exit button",
          "[data-cy=database-exit-button]",
          beVisible,
        ),
        // newExpectation(
        //   "should not have repo clone button",
        //   "[data-cy=repo-clone-button]",
        //   notBeVisible,
        // ),
        ...testTabs(beVisible),
        // newExpectation(
        //   "should not have nav dropdown",
        //   "[data-cy=dropdown-database-nav]",
        //   notBeVisible,
        // ),
      ]
    : [
        ...testCommonHeader(depName, ownerName, dbName),
        newExpectation(
          "should have exit button",
          "[data-cy=database-exit-button]",
          beVisible,
        ),
        // newExpectationWithClickFlows(
        //   "should have repo clone button",
        //   "[data-cy=repo-clone-button]",
        //   beVisible,
        //   [cloneClickFlow],
        // ),
        ...testTabs(beVisible),
        // newExpectationWithClickFlows(
        //   "should have functioning nav dropdown",
        //   "[data-cy=repo-dropdown-button]",
        //   beVisible,
        //   [databaseDropdownClickFlow(loggedIn, hasDocs)],
        // ),
      ];

  // const loggedInRepoHeaderTests = [testRepoSettingsTab];

  return loggedOutRepoHeaderTests;
};

export const testMobileRepoHeaderNav = (
  ownerName: string,
  depName: string,
  dbName: string,
): Expectation[] => [
  ...testCommonHeader(ownerName, depName, dbName),
  newExpectation(
    "should have exit button",
    "[data-cy=mobile-database-exit-icon]",
    beVisible,
  ),
  // newExpectation(
  //   "should not have clone button",
  //   "[data-cy=repo-clone-button]",
  //   notBeVisible,
  // ),
  // newExpectation(
  //   "should not have nav dropdown",
  //   "[data-cy=repo-dropdown-button]",
  //   notBeVisible,
  // ),
  ...testTabs(notBeVisible),
  // newExpectation(
  //   "should not have Repo Settings section",
  //   "[data-cy=repo-settings-tab]",
  //   notExist,
  // ),
];

export const testRepoHeaderWithBranch = (
  ownerName: string,
  depName: string,
  dbName: string,
  // loggedIn: boolean,
  // hasDocs: boolean,
  isIpad = false,
): Tests => [
  ...testRepoHeaderForAll(ownerName, depName, dbName, isIpad),
  // newExpectationWithClickFlows(
  //   "should open create fork modal on fork button click",
  //   "[data-cy=repo-fork-button]",
  //   beVisible,
  //   [forkButtonClickFlow(loggedIn)],
  // ),
];
