import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Settings account page";
const currentPage = "/settings/account";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("page-title", "Settings"),
    shouldBeVisible("account-info-form"),
    shouldFindAndContain("account-username", ["Username", "cypresstesting"]),
    shouldBeVisible("account-display-name"),
    shouldBeVisible("account-company-name"),
    shouldBeVisible("update-account-button"),
  ];
  const deskTests = [
    shouldFindAndContain("subnav-link-active", "Account"),
    ...tests,
  ];
  // TODO: Fix flaky mobile navbar test
  const devices = desktopDevicesForAppLayout(pageName, deskTests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
