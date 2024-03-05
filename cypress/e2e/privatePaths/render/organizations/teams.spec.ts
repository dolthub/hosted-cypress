import {
  beVisibleAndContain,
  shouldFindAndCloseModal,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

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

    shouldFindAndCloseModal,

    shouldFindAndContain("testTeam-link", "testTeam"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
