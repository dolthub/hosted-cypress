import { shouldBeVisible } from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Support tickets page";
const currentPage = "/support?tab=view";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("new-ticket-tab"),
    shouldBeVisible("active-view-tickets-tab"),
    shouldBeVisible("no-incidents"),
    shouldBeVisible("reload-button"),
  ];

  const devices = desktopDevicesForAppLayout(pageName, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
