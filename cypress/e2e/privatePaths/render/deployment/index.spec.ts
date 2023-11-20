import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindAndScrollTo,
  shouldFindAndScrollToWithText,
  shouldFindButton,
  shouldFindCheckbox,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Deployment page";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/deployments/${ownerName}/${depName}`;

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

const supportedOverrides = [
  "behavior_auto_commit",
  "behavior_dolt_transaction_commit",
  "behavior_read_only",
  "behavior_sysvar_persistence",
  "behavior_disable_multistatements",
  "listener_max_connections",
  "listener_read_timeout_millis",
  "listener_write_timeout_millis",
  "perf_query_parallelism",
  "max_logged_query_len",
  "log_level",
];

const cloneTests = [
  { dataCy: "clone-header", text: "Clone" },
  {
    dataCy: "clone-instructions",
    text: `You can clone "us-jails" using the Dolt CLI* by executing these commands:`,
  },
];

describe(pageName, () => {
  const tests = (isMobile = false) => [
    ...deploymentHeaderTests(ownerName, depName, false, isMobile),
    shouldNotExist("must-admin-msg"),
    shouldNotExist("must-started-msg"),
    shouldFindAndContain("active-tab-database", "Database"),
    shouldBeVisible("deployment-summary"),
    shouldNotExist("deployment-destroyed-at"),
    shouldFindAndScrollTo("deployment-created-at"),
    ...connectivityTests.map(test =>
      shouldFindAndScrollToWithText(test.dataCy, test.text),
    ),
    ...supportedOverrides.map(supportedOverride =>
      shouldFindAndScrollTo(supportedOverride),
    ),
    ...cloneTests.map(test =>
      shouldFindAndScrollToWithText(test.dataCy, test.text),
    ),
    shouldFindAndScrollTo("expose-remotesapi-endpoint-checkbox"),
    ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", true),
    shouldFindButton("update-advanced-settings-button", true),
  ];

  const devices = allDevicesForAppLayout(
    pageName,
    tests(),
    tests(true),
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
