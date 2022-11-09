import { allDevicesForAppLayout } from "@utils/devices";
import {
  newExpectationWithClickFlows,
  newClickFlow,
  newExpectation,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldBeVisible,
  beVisibleAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Account tab";
const currentPage = "/organizations/testorg?tab=account";
const loggedIn = true;

const organizationFormFindAndContains = [
  {
    datacy: "account-label",
  },
  {
    datacy: "account-name",
  },
  {
    datacy: "account-email",
  },
];

const organizationDeleteModalFinAndContains = [
  {
    datacy: "delete-organization-button",
    text: "Delete Organization",
  },
  {
    datacy: "modal-title",
    text: "Delete testorg?",
  },
  // {
  //   datacy: "account-modal-cancel-button",
  //   text: "cancel",
  // },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    ...organizationFormFindAndContains.map(test =>
      shouldBeVisible(test.datacy),
    ),

    ...organizationDeleteModalFinAndContains.map(test =>
      test.datacy.includes("button")
        ? newExpectationWithClickFlows(
            `should find ${test.text}`,
            `[data-cy=${test.datacy}]`,
            beVisibleAndContain(test.text),
            [newClickFlow(`[data-cy=${test.datacy}]`, [])],
          )
        : shouldFindAndContain(test.datacy, test.text),
    ),

    newExpectationWithClickFlows(
      "should find modal cancel button",
      `[data-cy=account-modal] button:last-of-type`,
      beVisibleAndContain("cancel"),
      [newClickFlow(`[data-cy=account-modal] button:last-of-type`, [])],
    ),

    ...organizationFormFindAndContains.map(test =>
      shouldBeVisible(test.datacy),
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
