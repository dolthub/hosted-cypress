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
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;

const loggedIn = true;

const settingDataCys = [
  "collab-header",
  "collab-table",
  "cypresstesting-collab-row",
  "add-collaborator-header",
  "add-collab-radios",
];

const formClickAndFinds = [
  { clickCy: "radio-team", findCy: "add-team-form" },
  { clickCy: "radio-individual", findCy: "add-individual-form" },
];

describe(pageName, () => {
  const tests = [
    ...settingDataCys.map(dataCy =>
      newExpectationWithScrollIntoView(
        `should scroll to ${dataCy}`,
        `[data-cy=${dataCy}]`,
        beVisible,
        true,
      ),
    ),
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
  ];

  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
