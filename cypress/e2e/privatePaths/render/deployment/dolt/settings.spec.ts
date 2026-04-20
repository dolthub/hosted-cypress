import {
  desktopDevicesForAppLayout,
  iPhoneXForAppLayout,
} from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { settingsTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment settings page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;
const loggedIn = true;

describe(pageName, () => {
  const devices = [
    ...desktopDevicesForAppLayout(pageName, settingsTests(doltConfig)),
    iPhoneXForAppLayout(pageName, settingsTests(doltConfig, true)),
  ];
  runTestsForDevices({ currentPage, devices, loggedIn });
});
