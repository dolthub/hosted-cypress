import { allDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  notBeVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindAndScrollTo,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment settings page";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;

const loggedIn = true;

const swDataCys = [
  "service-window-settings",
  "service-window-day-of-week",
  "service-window-start-time",
  "service-window-end-time",
];

const formClickAndFinds = [
  { clickCy: "radio-team", findCy: "add-team-form" },
  { clickCy: "radio-individual", findCy: "add-individual-form" },
];

const editServiceWindowClickFlow = newClickFlow(
  "[data-cy=edit-service-window-button]",
  [
    newExpectation(
      "should have service window inputs",
      "[data-cy=service-window-settings] input",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    shouldBeVisible("save-service-window-button"),
  ],
  "[data-cy=cancel-button]",
);

const collabFormClickFlow = newClickFlow(
  "[data-cy=add-collab-button]",
  [
    shouldFindAndContain("add-collaborator-header", "Add a collaborator"),
    shouldBeVisible("add-collab-radios"),
    ...formClickAndFinds.map(test =>
      newExpectationWithClickFlows(
        `should find ${test.findCy}`,
        `[data-cy=${test.clickCy}]`,
        beVisible,
        [
          newClickFlow(`[data-cy=${test.clickCy}]`, [
            shouldBeVisible(test.findCy),
          ]),
        ],
      ),
    ),
  ],
  "[data-cy=cancel-button]",
);

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-settings", "Settings"),
    shouldFindAndScrollTo("service-window-settings"),
    ...swDataCys.map(dc => shouldBeVisible(dc)),
    newExpectation(
      "should have no service window inputs",
      "[data-cy=service-window-settings] input",
      notBeVisible,
    ),
    newExpectationWithClickFlows(
      "should show edit service window inputs on edit",
      "[data-cy=edit-service-window-button]",
      beVisible,
      [editServiceWindowClickFlow],
    ),
    shouldFindAndScrollTo("collab-header"),
    shouldBeVisible("collab-table"),
    shouldBeVisible("cypresstesting-collab-row"),
    newExpectationWithClickFlows(
      "should open new collaborator modal",
      "[data-cy=add-collab-button]",
      beVisible,
      [collabFormClickFlow],
    ),
    shouldFindAndScrollTo("advanced-settings"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
