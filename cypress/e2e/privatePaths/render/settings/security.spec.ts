import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Settings security page";
const currentPage = "/settings/security";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Settings"),
    shouldFindAndContain("change-password-header", "Security"),
    shouldBeVisible("old-password-input"),
    shouldBeVisible("new-password-input"),
    shouldBeVisible("confirm-password-input"),
    shouldBeVisible("update-password-button"),
  ];
  const deskTests = [
    shouldFindAndContain("subnav-link-active", "Security"),
    ...tests,
  ];
  // TODO: Fix flaky mobile navbar test
  const devices = desktopDevicesForAppLayout(pageName, deskTests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
