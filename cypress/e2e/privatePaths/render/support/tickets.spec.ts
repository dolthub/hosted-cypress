import { runTestsForDevices } from "../../../utils";
import { desktopDevicesForAppLayout } from "../../../utils/devices";
import { shouldBeVisible } from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Support tickets page";
const currentPage = "/support?tab=view";

describe(pageName, () => {
  const tests = [
    shouldBeVisible("new-ticket-tab"),
    shouldBeVisible("active-view-tickets-tab"),
    shouldBeVisible("no-incidents"),
    shouldBeVisible("reload-button"),
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
