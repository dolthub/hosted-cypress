import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisibleAndContain,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment connectivity page";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;

const loggedIn = true;

const connectivityFindAndContains = [
  { dataCy: "connectivity-field-host", text: "Host" },
  { dataCy: "connectivity-field-port", text: "Port" },
  { dataCy: "connectivity-field-username", text: "Username" },
  { dataCy: "connectivity-field-password", text: "Password" },
  { dataCy: "connectivity-field-certificate", text: "Certificate" },
  { dataCy: "instructions-header", text: "Connect to server" },
  { dataCy: "docs-link", text: "Read the docs" },
  { dataCy: "clone-header", text: "Clone database" },
  {
    dataCy: "clone-instructions",
    text: `You can clone "us_jails" using the Dolt CLI* by executing these commands:`,
  },
];

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName),
    shouldFindAndContain("active-tab-connectivity", "Connectivity"),
    ...connectivityFindAndContains.map(test =>
      newExpectationWithScrollIntoView(
        `should scroll to ${test.dataCy}`,
        `[data-cy=${test.dataCy}]`,
        beVisibleAndContain(test.text),
        true,
      ),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
