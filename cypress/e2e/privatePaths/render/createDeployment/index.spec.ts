import {
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindAndHaveValue,
  shouldFindButton,
  shouldFindCheckbox,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { scrollToPosition } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Create deployment page";
const currentPage = "/create-deployment";
const loggedIn = true;
const isDev =
  Cypress.env("LOCAL") ||
  Cypress.config().baseUrl?.includes("hosteddoltdb.hosteddev.ld-corp.com");

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Create Deployment"),
    shouldBeVisible("no-subscription-banner"),
    shouldNotExist("no-perm-banner"),
    shouldNotExist("backup-banner"),
    shouldFindAndContain("owner-select", ["Owner", "cypresstesting"]),
    shouldFindAndHaveValue("deployment-name-input", ""),
    shouldFindAndContain("zone-select", ["Zone", "us-west-2"]),
    shouldFindAndContain("instance-type-select-with-details", [
      "Instance Type",
      "m4.large",
    ]),
    shouldFindAndContain("storage-select", ["Storage", "EBS GP3"]),
    shouldFindAndHaveValue("volume-size-input", 100),
    ...shouldFindCheckbox("web-pki-cert-checkbox", false),
    ...shouldFindCheckbox("workbench-users-checkbox", true),
    ...(isDev
      ? shouldFindCheckbox("deployment-flag-checkbox", true)
      : [shouldNotExist("deployment-flag-checkbox")]),
    scrollToPosition("#main-content", "bottom"),
    shouldFindAndContain("hourly-cost", [
      "Hourly cost:",
      "$0.67 + egress costs",
    ]),
    shouldFindButton("create-deployment-button", true),
  ];

  const devices = allDevicesForAppLayout(
    pageName,
    tests,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
