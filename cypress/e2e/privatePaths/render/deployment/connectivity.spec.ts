import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisibleAndContain,
  shouldBeVisible,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment connectivity page";
const ownerName = "dolthub";
const depName = "us-jails-3";
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;

const loggedIn = true;

const connectivityFindAndContains = [
  { dataCy: "connectivity-field-host", text: "Host" },
  { dataCy: "connectivity-field-port", text: "Port" },
  { dataCy: "connectivity-field-username", text: "Username" },
  { dataCy: "connectivity-field-password", text: "Password" },
  { dataCy: "instructions-header", text: "Connect to server" },
  { dataCy: "docs-link", text: "Read the docs" },
  { dataCy: "clone-header", text: "Clone database" },
  {
    dataCy: "create-from-backup-button",
    text: "Create new deployment with Web PKI from latest backup",
  },
];

describe(pageName, () => {
  const tests = [
    ...connectivityFindAndContains.map(test =>
      newExpectationWithScrollIntoView(
        `should scroll to ${test.dataCy}`,
        `[data-cy=${test.dataCy}]`,
        beVisibleAndContain(test.text),
        true,
      ),
    ),
    shouldBeVisible("disabled-clone-instructions"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
