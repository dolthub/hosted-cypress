import { runTestsForDevices } from "../../../utils";
import { desktopDevicesForAppLayout } from "../../../utils/devices";
import { shouldFindAndBeVisible } from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Support tickets page";
const currentPage = "/support?tab=view";

describe(pageName, () => {
  const tests = [
    shouldFindAndBeVisible("new-ticket-tab"),
    shouldFindAndBeVisible("active-view-tickets-tab"),
    shouldFindAndBeVisible("no-incidents"),
    shouldFindAndBeVisible("reload-button"),
  ];

  const devices = desktopDevicesForAppLayout(
    pageName,
    tests,
    false,
    true,
    true,
  );
  runTestsForDevices({ currentPage, devices });
});
