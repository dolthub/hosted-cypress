import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment support page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=support`;

const loggedIn = true;

const formFindAndContains = [
  { dataCy: "deployment-select", text: "Deployment(s)" },
  { dataCy: "impact-select", text: "Impact" },
  { dataCy: "submit-button", text: "Submit" },
];

describe(pageName, () => {
  const tests = [
    shouldBeVisible("create-support-ticket"),
    shouldFindAndContain(
      "create-support-ticket-header",
      "Create a support ticket",
    ),
    shouldBeVisible("support-form"),
    ...formFindAndContains.map(test =>
      newExpectationWithScrollIntoView(
        `should scroll to ${test.text}`,
        `[data-cy=${test.dataCy}]`,
        beVisibleAndContain(test.text),
        true,
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
