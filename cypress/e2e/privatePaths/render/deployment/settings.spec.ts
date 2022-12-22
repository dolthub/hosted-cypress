import { allDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisible,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment settings page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;

const loggedIn = true;

const SettingDataCy = [
  "collab-header",
  "collab-table",
  "cypresstesting-collab-row",
  "jasonfulghum-collab-row",
  "somethingelse-collab-row",
  "timsehn-collab-row",
  "add-collaborator-header",
  "add-collab-radios",
];

describe(pageName, () => {
  const tests = [
    ...SettingDataCy.map(supportedOverride =>
      newExpectationWithScrollIntoView(
        `should scroll to ${supportedOverride}`,
        `[data-cy=${supportedOverride}]`,
        beVisible,
        true,
      ),
    ),
    newExpectationWithClickFlows(
      "should open add team form ",
      `[data-cy=radio-team]`,
      beVisible,
      [newClickFlow(`[data-cy=radio-team]`, [shouldBeVisible("error-msg")])],
    ),
    newExpectationWithClickFlows(
      "should open add individual form ",
      `[data-cy=radio-individual]`,
      beVisible,
      [
        newClickFlow(`[data-cy=radio-individual]`, [
          shouldBeVisible("add-individual-form"),
        ]),
      ],
    ),
  ];

  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices });
});
