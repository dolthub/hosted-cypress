import {
  desktopDevicesForAppLayout,
  iPhoneXForAppLayout,
} from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { settingsTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment settings page";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=settings`;
const loggedIn = true;

describe(pageName, () => {
  const devices = [
    ...desktopDevicesForAppLayout(pageName, settingsTests(doltgresConfig)),
    iPhoneXForAppLayout(pageName, settingsTests(doltgresConfig, true)),
  ];
  runTestsForDevices({ currentPage, devices, loggedIn });
});
