import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Settings page";
const currentPage = "/settings";
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
  const devices = allDevicesForAppLayout(pageName, deskTests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
