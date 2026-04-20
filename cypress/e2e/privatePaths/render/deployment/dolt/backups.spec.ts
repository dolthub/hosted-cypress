import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { backupsTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment backups page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=backups`;
const loggedIn = true;
const skip = false;

describe(pageName, () => {
  // TODO: Fix for mobile
  const devices = desktopDevicesForAppLayout(
    pageName,
    backupsTests(doltConfig),
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
