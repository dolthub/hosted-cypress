import { shouldBeVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Support tickets page";
const currentPage = "/support?tab=view";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("tab-new-ticket"),
    shouldBeVisible("active-tab-view-tickets"),
    shouldBeVisible("no-incidents"),
    shouldBeVisible("reload-button"),
  ];

  const devices = desktopDevicesForAppLayout(pageName, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
