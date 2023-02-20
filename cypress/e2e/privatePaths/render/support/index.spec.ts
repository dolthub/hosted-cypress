import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
  shouldSelectOption,
} from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithTypeString,
  newShouldArgs,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "New support ticket page";
const currentPage = "/support";
const loggedIn = true;

const isDev =
  Cypress.env("LOCAL") ||
  Cypress.config().baseUrl?.includes("hosteddoltdb.hosteddev.ld-corp.com");
const skip = !!isDev; // TODO: Unskip on dev when deployment search exists

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("create-support-ticket", "Create a support ticket"),
    shouldBeVisible("active-new-ticket-tab"),
    shouldBeVisible("view-tickets-tab"),
    shouldBeVisible("support-form"),
    shouldNotExist("critical-err"),
    newExpectation(
      "should have disabled submit button",
      "[data-cy=submit-button]",
      newShouldArgs("is.disabled"),
    ),
    // TODO: Uncomment when deployment search exists
    // ...shouldTypeAndSelectOption(
    //   "dolthub/us-jails",
    //   "deployment-select",
    //   2,
    //   2,
    //   "us-jails",
    // ),
    // shouldSelectOption("Critical", "impact-select", 3, 1),
    // shouldBeVisible("critical-err"),
    shouldSelectOption(
      "dolthub/us-jails-3",
      "deployment-select",
      2,
      isDev ? 5 : 1,
    ),
    // newExpectationWithClickFlows(
    //   "should remove inactive deployment",
    //   `[aria-label="Remove dolthub/us-jails"]`,
    //   beVisible,
    //   [
    //     newClickFlow(`[aria-label="Remove dolthub/us-jails"]`, [
    //       newExpectation(
    //         "inactive deployment should be removed",
    //         `[aria-label="Remove dolthub/us-jails"]`,
    //         notExist,
    //       ),
    //     ]),
    //   ],
    // ),
    // shouldNotExist("critical-err"),
    newExpectationWithTypeString(
      "should add title",
      "input[name=title]",
      beVisible,
      { value: "HELP ME" },
    ),
    scrollToPosition("#main-content", "bottom"),
    newExpectationWithTypeString(
      "should add summary",
      "textarea[name=summary]",
      beVisible,
      { value: "More details about helping me" },
    ),
    newExpectation(
      "should have enabled submit button",
      "[data-cy=submit-button]",
      newShouldArgs("is.enabled"),
    ),
  ];

  const devices = desktopDevicesForAppLayout(pageName, tests);
  runTestsForDevices({ currentPage, devices, loggedIn, skip });
});
