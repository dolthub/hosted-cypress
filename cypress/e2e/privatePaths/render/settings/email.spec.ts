import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation, newShouldArgs } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import {
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Settings email page";
const currentPage = "/settings/email";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Settings"),
    shouldBeVisible("emails-table"),
    newExpectation(
      `should find emails table row`,
      `[data-cy=emails-table] tr`,
      newShouldArgs("be.visible.and.have.length", 1),
    ),
    newExpectation(
      `should find email in first cell of first row`,
      `[data-cy=emails-table] tr:first td:first`,
      beVisibleAndContain("taylor+testing@dolthub.com"),
    ),
    newExpectation(
      `should find primary label in second cell of first row`,
      `[data-cy=emails-table] tr:first td:nth-child(2)`,
      beVisibleAndContain("Primary"),
    ),
    shouldNotExist("edit-email-button"),
    shouldNotExist("delete-email-button"),
    shouldNotExist("make-primary-button"),
    shouldNotExist("resend-verify-button"),
    shouldBeVisible("add-email-form"),
    shouldBeVisible("email-input"),
    shouldBeVisible("add-email-settings-button"),
  ];
  const deskTests = [
    shouldFindAndContain("subnav-link-active", "Email"),
    ...tests,
  ];
  const devices = allDevicesForAppLayout(pageName, deskTests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
