import {
  beVisibleAndContain,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { iPad2ForAppLayout, macbook15ForAppLayout } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Organization page: Visit Tabs";
const currentPage = "/organizations/testorg";
const loggedIn = true;

const organizationPageFindAndContains = [
  {
    tabDataCy: "account",
    datacy: "create-deployment-button",
    text: "Create Deployment",
  },
  {
    tabDataCy: "members",
    datacy: "delete-organization-button",
    text: "Delete Organization",
  },
  {
    tabDataCy: "teams",
    datacy: "add-member-button",
    text: "Add member",
  },
  {
    tabDataCy: "billing",
    datacy: "create-team-button",
    text: "Create Team",
  },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),

    ...organizationPageFindAndContains.map(test =>
      newExpectationWithClickFlows(
        `should find ${test.text}`,
        `[data-cy=${test.datacy}]`,
        beVisibleAndContain(test.text),
        [newClickFlow(`[data-cy=${test.tabDataCy}]`, [])],
      ),
    ),

    shouldFindAndContain(
      "billing-new-subscriber-section",
      "Sign up for a subscription to create deployments",
    ),
  ];

  // TODO: add mobile tests
  const devices = [
    macbook15ForAppLayout(pageName, tests),
    iPad2ForAppLayout(pageName, tests),
  ];

  runTestsForDevices({ currentPage, devices, loggedIn });
});
