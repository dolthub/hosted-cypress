import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldBeVisible,
  beVisibleAndContain,
  shouldFindAndCloseModal,
} from "@sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Account tab";
const currentPage = "/organizations/testorg?tab=account";
const loggedIn = true;

const organizationFormFindAndContains = [
  "account-label",
  "account-name",
  "account-email",
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    ...organizationFormFindAndContains.map(datacy => shouldBeVisible(datacy)),

    newExpectationWithClickFlows(
      `should find Delete Organization`,
      `[data-cy=delete-organization-button]`,
      beVisibleAndContain("Delete Organization"),
      [newClickFlow(`[data-cy=delete-organization-button]`, [])],
    ),

    shouldFindAndContain("modal-title", "Delete testorg?"),

    shouldFindAndCloseModal("account-modal-buttons"),
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
