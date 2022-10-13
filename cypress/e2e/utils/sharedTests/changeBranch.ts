import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithURL,
} from "../helpers";
import { Tests } from "../types";
import {
  beVisible,
  beVisibleAndContain,
  shouldFindAndContain,
} from "./sharedFunctionsAndVariables";

type TestParams = {
  isLeftNavClosed: boolean;
  currentTabDataCy: string;
  destinationURL: string;
  optionalText?: string;
  destinationBranch: string;
  destinationBranchOptionalText?: string;
};

const checkCurrentBranch = (testParams: TestParams): Tests =>
  testParams.destinationBranchOptionalText
    ? [
        newExpectationWithURL(
          `should load page for tab ${testParams.currentTabDataCy}`,
          `[data-cy=${testParams.currentTabDataCy}]`,
          beVisible,
          testParams.destinationURL,
        ),
        shouldFindAndContain(
          testParams.currentTabDataCy,
          testParams.destinationBranchOptionalText,
        ),
      ]
    : [
        newExpectationWithURL(
          "should have page load in ",
          `[data-cy=${testParams.currentTabDataCy}]`,
          beVisible,
          testParams.destinationURL,
        ),
      ];

export const changeBranch = (testParams: TestParams): Tests => [
  newExpectation(
    `should check current branch ${testParams.currentTabDataCy}`,
    `[data-cy=${testParams.currentTabDataCy}]`,
    testParams.optionalText
      ? beVisibleAndContain(testParams.optionalText)
      : beVisible,
  ),
  testParams.isLeftNavClosed
    ? newExpectationWithClickFlows(
        "should open menu",
        `[data-cy=left-nav-toggle-icon]`,
        beVisible,
        [
          newClickFlow(`[data-cy=left-nav-toggle-icon]`, [
            newExpectationWithClickFlows(
              "should open branch selector",
              `[data-cy=branch-selector]`,
              beVisible,
              [
                newClickFlow(`[data-cy=branch-selector]`, [
                  newExpectationWithClickFlows(
                    "should click on other branch",
                    `[data-cy=${testParams.destinationBranch}]`,
                    beVisible,
                    [
                      newClickFlow(
                        `[data-cy=${testParams.destinationBranch}]`,
                        checkCurrentBranch(testParams),
                      ),
                    ],
                  ),
                ]),
              ],
            ),
          ]),
        ],
      )
    : newExpectationWithClickFlows(
        "should open branch selector",
        `[data-cy=branch-selector]`,
        beVisible,
        [
          newClickFlow(`[data-cy=branch-selector]`, [
            newExpectationWithClickFlows(
              "should click on other branch",
              `[data-cy=${testParams.destinationBranch}]`,
              beVisible,
              [
                newClickFlow(
                  `[data-cy=${testParams.destinationBranch}]`,
                  checkCurrentBranch(testParams),
                ),
              ],
            ),
          ]),
        ],
      ),
];
