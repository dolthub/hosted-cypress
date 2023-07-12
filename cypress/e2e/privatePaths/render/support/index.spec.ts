import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindButton,
  shouldNotExist,
  shouldSelectOption,
  shouldTypeAndSelectOption,
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

const skip = false; // TODO: Unskip when deployment search exists

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("create-support-ticket", "Create a support ticket"),
    shouldBeVisible("active-new-ticket-tab"),
    shouldBeVisible("view-tickets-tab"),
    shouldBeVisible("support-form"),
    shouldNotExist("critical-err"),
    shouldFindButton("submit-button", true),
    // TODO: Uncomment when deployment search exists
    ...shouldTypeAndSelectOption(
      "automated_testing/us-jails",
      "deployment-select",
      2,
      2,
      "us-jails",
    ),
    shouldSelectOption("Critical", "impact-select", 3, 1),
    // shouldBeVisible("critical-err"),
    // shouldSelectOption(
    //   "automated_testing/us-jails",
    //   "deployment-select",
    //   2,
    //   isDev ? 5 : 1,
    // ),
    // newExpectationWithClickFlows(
    //   "should remove inactive deployment",
    //   `[aria-label="Remove automated_testing/us-jails"]`,
    //   beVisible,
    //   [
    //     newClickFlow(`[aria-label="Remove automated_testing/us-jails"]`, [
    //       newExpectation(
    //         "inactive deployment should be removed",
    //         `[aria-label="Remove automated_testing/us-jails"]`,
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
