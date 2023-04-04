import { allDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  notExist,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindCheckbox,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment settings page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;

const loggedIn = true;

const settingDataCys = [
  "service-window-settings",
  "service-window-day-of-week",
  "service-window-start-time",
  "service-window-end-time",
  "collab-header",
  "collab-table",
  "cypresstesting-collab-row",
  "advanced-settings",
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
      newShouldArgs("be.visible.and.have.length", 4),
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
    ...settingDataCys.map(dc =>
      newExpectationWithScrollIntoView(
        `should scroll to ${dc}`,
        `[data-cy=${dc}]`,
        beVisible,
        true,
      ),
    ),
    newExpectation(
      "should have no service window inputs",
      "[data-cy=service-window-settings] input",
      notExist,
    ),
    newExpectationWithClickFlows(
      "should show edit service window inputs on edit",
      "[data-cy=edit-service-window-button]",
      beVisible,
      [editServiceWindowClickFlow],
    ),
    newExpectationWithClickFlows(
      "should open new collaborator modal",
      "[data-cy=add-collab-button]",
      beVisible,
      [collabFormClickFlow],
    ),
    ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", false, true),
    newExpectation(
      "should have disabled update advanced settings button",
      "[data-cy=update-advanced-settings-button]",
      newShouldArgs("be.disabled"),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
