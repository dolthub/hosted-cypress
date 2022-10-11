import { runTestsForDevices } from "../../../utils";
import { desktopDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithTypeString,
  newShouldArgs,
  scrollToPosition,
} from "../../../utils/helpers";
import {
  beVisible,
  notExist,
  shouldFindAndBeVisible,
  shouldFindAndContain,
  shouldNotExist,
  shouldSelectOption,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "New support ticket page";
const currentPage = "/support";

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("create-support-ticket", "Create a support ticket"),
    shouldFindAndBeVisible("active-new-ticket-tab"),
    shouldFindAndBeVisible("view-tickets-tab"),
    shouldFindAndBeVisible("support-form"),
    shouldNotExist("critical-err"),
    newExpectation(
      "should have disabled submit button",
      "[data-cy=submit-button]",
      newShouldArgs("is.disabled"),
    ),
    shouldSelectOption("dolthub/us-jails", "deployment-select", 2, 1),
    shouldSelectOption("Critical", "impact-select", 3, 1),
    shouldFindAndBeVisible("critical-err"),
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
    true,
  );
  runTestsForDevices({ currentPage, devices });
});
