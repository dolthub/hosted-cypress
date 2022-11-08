import {
  beVisibleAndContain,
  haveLength,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Reset password page";
const fakeToken = "this-is-a-fake-token";
const currentPage = `/recover-password?token=${fakeToken}`;

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndContain(
      "reset-password-page",
      ["Reset your password", "Please enter a new password below."],
      "reset password component with correct title",
    ),
    newExpectation(
      "should have reset password form with inputs",
      "[data-cy=reset-password-form] input",
      haveLength(2),
    ),
    newExpectation(
      "should have new password input",
      "[data-cy=reset-password-form] div:first-of-type",
      beVisibleAndContain("New Password"),
    ),
    newExpectation(
      "should have confirm password input",
      "[data-cy=reset-password-form] div:last-of-type",
      beVisibleAndContain("Confirm Password"),
    ),
    newExpectation(
      "should have submit button",
      "[data-cy=reset-password-form] button",
      newShouldArgs("be.disabled"),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
