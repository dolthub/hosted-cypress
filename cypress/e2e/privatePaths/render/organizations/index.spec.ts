import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
} from "../../../utils/helpers";
import {
  beVisibleAndContain,
  shouldFindAndContain,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Organization page: Visit Tabs";
const currentPage = "/organizations/testorg";
const loggedIn = true;

const orgizationPageFindAndContains = [
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
  {
    datacy: "billing-new-subscriber-section",
    text: "Sign up for a subscription to create deployments.",
    clickToDataCy: "deployments",
  },
  {
    datacy: "create-deployment-button",
    text: "Create Deployment",
    clickToDataCy: "account",
  },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("organization-header", "organizations / testorg"),
    shouldFindAndContain("create-deployment-button", "Create Deployment"),

    ...orgizationPageFindAndContains.map(test =>
      newExpectationWithClickFlows(
        `should find ${test.text}`,
        `[data-cy=${test.datacy}]`,
        beVisibleAndContain(test.text),
        [newClickFlow(`[data-cy=${test.clickToDataCy}]`, [])],
      ),
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
