import {
  beVisible,
  notExist,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
  shouldSelectOption,
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
    shouldSelectOption("dolthub/us-jails", "deployment-select", 2, 1),
    shouldSelectOption("Critical", "impact-select", 3, 1),
    shouldBeVisible("critical-err"),
    shouldSelectOption("dolthub/us-jails-2", "deployment-select", 2, 0),
    newExpectationWithClickFlows(
      "should remove inactive deployment",
      `[aria-label="Remove dolthub/us-jails"]`,
      beVisible,
      [
        newClickFlow(`[aria-label="Remove dolthub/us-jails"]`, [
          newExpectation(
            "inactive deployment should be removed",
            `[aria-label="Remove dolthub/us-jails"]`,
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

  const devices = desktopDevicesForAppLayout(
    pageName,
    tests,
    false,
    true,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
