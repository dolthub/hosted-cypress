import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  beVisibleAndContain,
  shouldFindAndCloseModal,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Members tab";
const currentPage = "/organizations/testorg?tab=members";
const loggedIn = true;

const addMemberModalFindAndContains = [
  {
    datacy: "add-member-button",
    text: "Add member",
  },
  {
    datacy: "modal-title",
    text: "Add member to testorg",
  },
  // {
  //   datacy: "add-member-modal-cancel-button",
  //   text: "cancel",
  // },
];

const editMemberFindAndContains = [
  {
    datacy: "edit-button-cypresstesting",
    text: "Edit",
  },
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

    ...addMemberModalFindAndContains.map(test =>
      test.datacy.includes("button")
        ? newExpectationWithClickFlows(
            `should find ${test.text}`,
            `[data-cy=${test.datacy}]`,
            beVisibleAndContain(test.text),
            [newClickFlow(`[data-cy=${test.datacy}]`, [])],
          )
        : shouldFindAndContain(test.datacy, test.text),
    ),
    shouldFindAndCloseModal("add-member-modal-buttons"),

    ...editMemberFindAndContains.map(test =>
      test.datacy.includes("button")
        ? newExpectationWithClickFlows(
            `should find ${test.text}`,
            `[data-cy=${test.datacy}]`,
            beVisibleAndContain(test.text),
            [newClickFlow(`[data-cy=${test.datacy}]`, [])],
          )
        : shouldFindAndContain(test.datacy, test.text),
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
