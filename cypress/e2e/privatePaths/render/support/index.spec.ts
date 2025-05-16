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
import { isDev } from "@utils/sharedTests/createDep";

const pageName = "New support ticket page";
const currentPage = "/support";
const loggedIn = true;

const skip = false;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("no-incidents"),
    shouldFindAndContain(
      "create-support-ticket-header",
      "Create a support ticket",
    ),
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
      isDev ? 0 : 2,
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
    scrollToPosition("#main-content", "bottom"),
    newExpectationWithTypeString(
      "should add title",
      "input[name=title]",
      beVisible,
      { value: "HELP ME" },
    ),
    newExpectationWithTypeString(
      "should add summary",
      "textarea[name=summary]",
      beVisible,
      { value: "More details about helping me" },
    ),
    shouldBeVisible("discord-radio"),
    shouldBeVisible("email-radio"),
    newExpectationWithTypeString(
      "should add title",
      "[data-cy=contact-input]",
      beVisible,
      { value: "testuser" },
    ),
    newExpectationWithClickFlows(
      "should check joined Discord checkbox",
      "[data-cy=joined-discord-checkbox]",
      beVisible,
      [newClickFlow("[data-cy=joined-discord-checkbox]", [])],
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
