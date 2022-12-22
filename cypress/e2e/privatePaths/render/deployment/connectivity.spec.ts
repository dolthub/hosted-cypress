import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { beVisibleAndContain } from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment connectivity page";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;

const loggedIn = true;

const connectivityFindAndContains = [
  { datacy: "connectivity-field-host", text: "Host" },
  { datacy: "connectivity-field-port", text: "Port" },
  { datacy: "connectivity-field-username", text: "Username" },
  { datacy: "connectivity-field-password", text: "Password" },
  { datacy: "instructions-header", text: "Connect to Server" },
  { datacy: "docs-link", text: "Read the docs" },
];

describe(pageName, () => {
  const tests = [
    ...connectivityFindAndContains.map(test =>
      newExpectationWithScrollIntoView(
        `should scroll to ${test.datacy}`,
        `[data-cy=${test.datacy}]`,
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
