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

const editMemberFindAndContains = [
  {
    datacy: "cypresstesting-member",
    text: "Member",
  },
  {
    datacy: "cypresstesting-owner",
    text: "Owner",
  },
  {
    datacy: "cypresstesting-remove",
    text: "Remove",
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
    shouldFindAndScrollTo("edit-button-cypresstesting"),

    newExpectationWithClickFlows(
      `should find Edit`,
      `[data-cy=edit-button-cypresstesting]`,
      beVisibleAndContain("Edit"),
      [newClickFlow(`[data-cy=edit-button-cypresstesting]`, [])],
    ),

    ...editMemberFindAndContains.map(test =>
      shouldFindAndContain(test.datacy, test.text),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
