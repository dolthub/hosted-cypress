import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Settings billing page";
const currentPage = "/settings/billing";
const loggedIn = true;

describe(pageName, () => {
  const inputs = [
    "name",
    "address-1",
    "address-2",
    "city",
    "state",
    "country",
    "card",
  ];
  const tests = [
    shouldFindAndContain("page-title", "Settings"),
    shouldFindAndContain("active-tab", "Billing"),
    shouldBeVisible("billing-new-subscriber-section"),
    ...inputs.map(i => shouldBeVisible(`${i}-input`)),
    shouldBeVisible("billing-submit-button"),
  ];
  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
