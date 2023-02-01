import {
  beVisibleAndContain,
  shouldFindAndCloseModal,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

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
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    ...addTeamModalFindAndContains.map(test =>
      shouldFindAndContain(test.datacy, test.text),
    ),

    newExpectationWithClickFlows(
      `should find Add Member`,
      `[data-cy=profile-add-member-button]`,
      beVisibleAndContain("Add Member"),
      [newClickFlow(`[data-cy=profile-add-member-button]`, [])],
    ),

    shouldFindAndContain("modal-title", "Add Team Member"),

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

  runTestsForDevices({ currentPage, devices, loggedIn });
});
