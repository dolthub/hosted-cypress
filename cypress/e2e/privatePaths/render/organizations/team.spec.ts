import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  beVisibleAndContain,
  shouldFindAndCloseModal,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Team tab";
const currentPage = "/organizations/testorg?tab=teams&teamName=testTeam";
const loggedIn = true;

const addTeamModalFindAndContains = [
  {
    datacy: "team-link",
    text: "teams / testTeam",
  },
  {
    datacy: "profile-team-name",
    text: "TtestTeam",
  },
  {
    datacy: "profile-team-description",
    text: "Fighting for Justice",
  },
  {
    datacy: "profile-add-member-button",
    text: "Add Member",
  },
  {
    datacy: "modal-title",
    text: "Add Team Member",
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

    shouldFindAndCloseModal("add-team-member-modal-buttons"),
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
