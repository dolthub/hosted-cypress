import {
  beVisibleAndContain,
  shouldFindAndCloseModal,
  shouldFindAndContain,
  shouldFindAndScrollTo,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Organization page: Members tab";
const currentPage = "/organizations/testorg?tab=members";
const loggedIn = true;

const editRoleTests = [
  {
    datacy: "update-cypresstesting-member",
    text: "Member",
  },
  {
    datacy: "update-cypresstesting-owner",
    text: "Owner",
  },
  {
    datacy: "cypresstesting-remove",
    text: "Remove",
  },
];

const editDepRoleTests = [
  {
    datacy: "update-dep-cypresstesting-admin",
    text: "Admin",
  },
  {
    datacy: "update-dep-cypresstesting-reader",
    text: "Reader",
  },
  {
    datacy: "update-dep-cypresstesting-readerandpulls",
    text: "Pull Request",
  },
  {
    datacy: "update-dep-cypresstesting-writer",
    text: "Writer",
  },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),
    newExpectationWithClickFlows(
      `should find Add member`,
      `[data-cy=add-member-button]`,
      beVisibleAndContain("Add Member"),
      [newClickFlow(`[data-cy=add-member-button]`, [])],
    ),
    shouldFindAndContain("modal-title", "Add organization member"),
    shouldFindAndCloseModal,

    shouldFindAndScrollTo("edit-role-button-cypresstesting"),
    newExpectationWithClickFlows(
      `should find Edit`,
      `[data-cy=edit-role-button-cypresstesting]`,
      beVisibleAndContain("Owner"),
      [newClickFlow(`[data-cy=edit-role-button-cypresstesting]`, [])],
    ),
    ...editRoleTests.map(test => shouldFindAndContain(test.datacy, test.text)),

    shouldFindAndScrollTo("edit-dep-button-cypresstesting"),
    newExpectationWithClickFlows(
      `should find Edit`,
      `[data-cy=edit-dep-button-cypresstesting]`,
      beVisibleAndContain("Admin"),
      [newClickFlow(`[data-cy=edit-dep-button-cypresstesting]`, [])],
    ),
    ...editDepRoleTests.map(test =>
      shouldFindAndContain(test.datacy, test.text),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
