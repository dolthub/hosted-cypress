import { runTestsForDevices } from "../../../utils";
import { desktopDevicesForAppLayout } from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";

const pageName = "Deployments page";
const currentPage = "/deployments";

describe(pageName, () => {
  const tests = [
    newExpectation(
      "should have deployments header",
      "#main-content",
      newShouldArgs("be.visible.and.contain", "My Deployments"),
    ),
  ];
  const devices = desktopDevicesForAppLayout(
    pageName,
    tests,
    false,
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices });
});
