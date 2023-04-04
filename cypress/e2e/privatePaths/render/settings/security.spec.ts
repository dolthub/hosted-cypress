import { allDevicesForAppLayout } from "@utils/devices";
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
    shouldFindAndContain("active-tab", "Security"),
    shouldFindAndContain("change-password-header", "Change password"),
    shouldBeVisible("old-password-input"),
    shouldBeVisible("new-password-input"),
    shouldBeVisible("confirm-password-input"),
    shouldBeVisible("update-password-button"),
  ];
  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
