import {
  beVisible,
  notExist,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindButton,
  shouldNotExist,
  shouldSelectOption,
  shouldTypeAndSelectOption,
} from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
  scrollToPosition,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "New support ticket page";
const currentPage = "/support";
const loggedIn = true;

const skip = false;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("create-support-ticket", "Create a support ticket"),
    shouldBeVisible("active-tab-new-ticket"),
    shouldBeVisible("tab-view-tickets"),
    shouldBeVisible("support-form"),
    shouldNotExist("critical-err"),
    shouldFindButton("submit-button", true),
    ...shouldTypeAndSelectOption(
      "dolthub/us-jails-1",
      "deployment-select",
      3,
      0,
      "us-jails-1",
    ),
    shouldSelectOption("Critical", "impact-select", 2, 1),
    shouldBeVisible("critical-err"),
    ...shouldTypeAndSelectOption(
      "automated_testing/us-jails",
      "deployment-select",
      3,
      1,
      "us-jails",
      true,
    ),
    newExpectationWithClickFlows(
      "should remove inactive deployment",
      `[aria-label="remove dolthub/us-jails-1"]`,
      beVisible,
      [
        newClickFlow(`[aria-label="remove dolthub/us-jails-1"]`, [
          newExpectation(
            "inactive deployment should be removed",
            `[aria-label="remove dolthub/us-jails-1"]`,
            notExist,
          ),
        ]),
      ],
    ),
    shouldNotExist("critical-err"),
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
