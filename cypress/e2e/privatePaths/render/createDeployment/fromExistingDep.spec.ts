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

const pageName = "Create deployment page with existing deployment params";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/create-deployment?ownerName=${ownerName}&deploymentName=${depName}`;
const loggedIn = true;
const isDev =
  Cypress.env("LOCAL") ||
  Cypress.config().baseUrl?.includes("hosteddoltdb.hosteddev.ld-corp.com");

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Create Deployment"),
    shouldNotExist("no-subscription-banner"),
    shouldBeVisible("no-perm-banner"),
    shouldBeVisible("existing-deployment"),
    shouldBeVisible("existing-deployment-checkboxes"),
    shouldNotExist("backups-banner"),
    shouldFindAndContain("owner-select", ["Owner", ownerName]),
    shouldFindAndHaveValue("deployment-name-input", "us-jails-1"),
    shouldFindAndContain("cloud-select", ["Cloud Provider", "AWS"]),
    shouldFindAndContain("zone-select", ["Zone", "us-west-2"]),
    shouldFindAndContain("instance-type-select-with-details", [
      "Instance Type",
      "m4.large",
    ]),
    shouldFindAndContain("storage-select", ["Storage", "EBS GP3"]),
    shouldFindAndHaveValue("volume-size-input", 100),
    ...shouldFindCheckbox("web-pki-cert-checkbox", true),
    ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", true),
    ...shouldFindCheckbox("workbench-users-checkbox", true),
    ...(isDev
      ? shouldFindCheckbox("deployment-flag-checkbox", false)
      : [shouldNotExist("deployment-flag-checkbox")]),
    scrollToPosition("#main-content", "bottom"),
    shouldFindAndContain("hourly-cost", ["Hourly cost:", "$0.67 + egress"]),
    shouldFindButton("create-deployment-button"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
