import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  beVisibleAndContain,
  shouldFindAndCloseModal,
} from "@sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Teams tab";
const currentPage = "/organizations/testorg?tab=teams";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    newExpectationWithClickFlows(
      `should find Create Team`,
      `[data-cy=create-team-button]`,
      beVisibleAndContain("Create Team"),
      [newClickFlow(`[data-cy=create-team-button]`, [])],
    ),

    shouldFindAndContain("modal-title", "Create team"),

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
