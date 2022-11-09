import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  beVisibleAndContain,
  shouldFindAndCloseModal,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Teams tab";
const currentPage = "/organizations/testorg?tab=teams";
const loggedIn = true;

const addTeamModalFindAndContains = [
  {
    datacy: "create-team-button",
    text: "Create Team",
  },
  {
    datacy: "modal-title",
    text: "Create team",
  },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    ...addTeamModalFindAndContains.map(test =>
      test.datacy.includes("button")
        ? newExpectationWithClickFlows(
            `should find ${test.text}`,
            `[data-cy=${test.datacy}]`,
            beVisibleAndContain(test.text),
            [newClickFlow(`[data-cy=${test.datacy}]`, [])],
          )
        : shouldFindAndContain(test.datacy, test.text),
    ),

    shouldFindAndCloseModal("create-team-modal-buttons"),

    shouldFindAndContain("testTeam-link", "testTeam"),
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
