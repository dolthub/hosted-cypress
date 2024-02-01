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

const pageName = "Create deployment page with pricing params";
const cloud = "aws";
const zone = "us-east-1";
const instanceType = "t2.medium";
const instanceId = `${cloud}.${instanceType}`;
const currentPage = `/create-deployment?zone=${zone}&instanceId=${instanceId}`;
const loggedIn = true;
const isDev =
  Cypress.env("LOCAL") ||
  Cypress.config().baseUrl?.includes("hosteddoltdb.hosteddev.ld-corp.com");

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Create Deployment"),
    shouldBeVisible("no-subscription-banner"),
    shouldNotExist("no-perm-banner"),
    shouldNotExist("existing-deployment"),
    shouldNotExist("backups-banner"),
    shouldFindAndContain("owner-select", ["Owner", "cypresstesting"]),
    shouldFindAndHaveValue("deployment-name-input", ""),
    shouldFindAndContain("cloud-select", [
      "Cloud Provider",
      cloud.toUpperCase(),
    ]),
    shouldFindAndContain("zone-select", ["Zone", zone]),
    shouldFindAndContain("instance-type-select-with-details", [
      "Instance Type",
      instanceType,
    ]),
    shouldFindAndContain("storage-select", ["Storage", "Trial 50GB EBS"]),
    shouldFindAndHaveValue("volume-size-input", 50),
    ...shouldFindCheckbox("web-pki-cert-checkbox", false),
    ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", false, true),
    ...shouldFindCheckbox("workbench-users-checkbox", true),
    ...(isDev
      ? shouldFindCheckbox("deployment-flag-checkbox", false)
      : [shouldNotExist("deployment-flag-checkbox")]),
    scrollToPosition("#main-content", "bottom"),
    shouldFindAndContain("hourly-cost", ["Hourly cost:", "$0.07 + egress"]),
    shouldFindButton("create-deployment-button", true),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
