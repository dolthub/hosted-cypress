import {
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Support tickets page";
const currentPage = "/support?tab=view";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldNotExist("create-support-ticket-header"),
    shouldNotExist("support-form"),
    shouldBeVisible("no-incidents"),
  ];

  const devices = desktopDevicesForAppLayout(pageName, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
