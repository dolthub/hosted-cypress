import { desktopDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { backupsTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment backups page";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=backups`;
const loggedIn = true;
const skip = false;

describe(pageName, () => {
  // TODO: Fix for mobile
  const devices = desktopDevicesForAppLayout(
    pageName,
    backupsTests(doltgresConfig),
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
