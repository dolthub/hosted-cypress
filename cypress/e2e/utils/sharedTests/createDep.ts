import { scrollToPosition } from "@utils/helpers";
import { Tests } from "@utils/types";
import {
  shouldClickAndFind,
  shouldFindAndContain,
  shouldFindAndHaveValue,
  shouldFindAndScrollTo,
  shouldFindButton,
  shouldFindCheckbox,
  shouldNotExist,
  shouldTypeString,
} from "./sharedFunctionsAndVariables";

export const isDev =
  Cypress.expose("LOCAL") ||
  Cypress.config().baseUrl?.includes("hosteddoltdb.hosteddev.ld-corp.com");

export const testAboutTab = (
  ownerName: string,
  depName: string,
  noExistingDep = false,
): Tests => {
  const depNameTests = noExistingDep
    ? [
        shouldFindAndHaveValue("deployment-name-input", ""),
        shouldFindButton("next-about", true),
        shouldTypeString("deployment-name-input", depName),
      ]
    : [
        shouldFindAndHaveValue("deployment-name-input", depName),
        shouldFindAndScrollTo("next-about"),
      ];

  return [
    shouldFindAndContain("create-deployment-header", [
      "Create Deployment",
      "Exit",
    ]),
    shouldFindAndContain("active-tab", "About"),
    shouldFindAndContain("owner-select", ["Owner", ownerName]),
    shouldFindAndScrollTo("deployment-name-input"),
    ...depNameTests,
    shouldFindButton("next-about", false),
    shouldClickAndFind("next-about", "cloud-select"),
  ];
};

export const testInstanceTab = (
  zone?: string,
  instanceType?: string,
  storage?: string,
): Tests => [
  shouldFindAndContain("active-tab", "Instance"),
  shouldFindAndContain("cloud-select", ["Cloud Provider", "AWS"]),
  shouldFindAndContain("zone-select", ["Zone", zone ?? "us-west-2"]),
  shouldFindAndContain("instance-type-select-with-details", [
    "Instance Type",
    instanceType ?? "m4.large",
  ]),
  shouldFindAndContain("storage-select", ["Storage", storage ?? "EBS GP3"]),
  shouldFindAndHaveValue("volume-size-input", storage ? 50 : 100),
  scrollToPosition("#main-content", "bottom"),
  shouldClickAndFind("next-instance", "web-pki-cert-checkbox"),
];

export const testAdvancedTab = (mobile = false): Tests => [
  ...(mobile ? [scrollToPosition("#main-content", "top")] : []),
  shouldFindAndContain("active-tab", "Advanced"),
  ...shouldFindCheckbox("web-pki-cert-checkbox", true),
  ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", false),
  ...(mobile ? [scrollToPosition("#main-content", "center")] : []),
  ...shouldFindCheckbox("workbench-users-checkbox", true),
  scrollToPosition("#main-content", "bottom"),
  ...(isDev
    ? shouldFindCheckbox("deployment-flag-checkbox", false)
    : [shouldNotExist("deployment-flag-checkbox")]),
  shouldClickAndFind("next-advanced", "confirm-deployment"),
];

// Costs are quoted with the billing owner's pricing multiplier, which defaults
// to 10x. Owners predating that default are grandfathered into a lower
// multiplier, so a grandfathered owner needs its cost passed in explicitly.
export const testConfirmTab = (cost?: string): Tests => [
  scrollToPosition("#main-content", "top"),
  shouldFindAndContain("active-tab", "Confirm"),
  shouldNotExist("error-msg"),
  shouldFindAndContain("hourly-cost", [
    "Hourly cost:",
    `$${cost ?? "1.11"} + egress`,
  ]),
  shouldFindAndScrollTo("create-deployment-button"),
];

// Quoting costs needs the owner's pricing multiplier, so it is only allowed for
// owners of the organization the deployment would belong to. Non-owners get an
// error in place of the cost breakdown.
export const testConfirmTabWithoutCostPerms = (ownerName: string): Tests => [
  scrollToPosition("#main-content", "top"),
  shouldFindAndContain("active-tab", "Confirm"),
  shouldNotExist("hourly-cost"),
  shouldFindAndContain(
    "error-msg",
    `Must be an owner of the organization '${ownerName}' to calculate deployment costs.`,
  ),
  shouldFindAndScrollTo("create-deployment-button"),
];
