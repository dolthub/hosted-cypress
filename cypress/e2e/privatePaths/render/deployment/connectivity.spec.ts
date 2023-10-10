import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldFindAndScrollToWithText,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment database page, connectivity section";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;

const loggedIn = true;

const connectivityTests = [
  { dataCy: "connectivity-field-host", text: "Host" },
  { dataCy: "connectivity-field-port", text: "Port" },
  { dataCy: "connectivity-field-username", text: "Username" },
  { dataCy: "connectivity-field-password", text: "Password" },
  { dataCy: "connectivity-field-certificate", text: "Certificate" },
  { dataCy: "connect-instructions", text: "MySQL Client" },
  { dataCy: "docs-link", text: "Read the docs" },
];

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("active-tab-database", "Database"),
    ...connectivityTests.map(test =>
      shouldFindAndScrollToWithText(test.dataCy, test.text),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
