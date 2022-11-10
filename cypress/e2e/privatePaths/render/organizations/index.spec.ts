import { iPad2ForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { newExpectationWithClickFlows, newClickFlow } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  beVisibleAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Visit Tabs";
const currentPage = "/organizations/testorg";
const loggedIn = true;

const organizationPageFindAndContains = [
  {
    datacy: "create-deployment-button",
    text: "Create Deployment",
    clickToDataCy: "account",
  },
  {
    datacy: "delete-organization-button",
    text: "Delete Organization",
    clickToDataCy: "members",
  },
  {
    datacy: "add-member-button",
    text: "Add member",
    clickToDataCy: "teams",
  },
  {
    datacy: "create-team-button",
    text: "Create Team",
    clickToDataCy: "billing",
  },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),
    shouldFindAndContain("create-deployment-button", "Create Deployment"),

    ...organizationPageFindAndContains.map(test =>
      newExpectationWithClickFlows(
        `should find ${test.text}`,
        `[data-cy=${test.datacy}]`,
        beVisibleAndContain(test.text),
        [newClickFlow(`[data-cy=${test.clickToDataCy}]`, [])],
      ),
    ),

    shouldFindAndContain(
      "billing-new-subscriber-section",
      "Sign up for a subscription to create deployments.",
    ),
  ];

  // TODO: add mobile tests
  const devices = [
    macbook15ForAppLayout(pageName, tests, false, true, loggedIn),
    iPad2ForAppLayout(pageName, tests, false, true, loggedIn),
  ];

  runTestsForDevices({ currentPage, devices });
});
