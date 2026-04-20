import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { indexTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment page";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    indexTests(doltgresConfig),
    indexTests(doltgresConfig, true),
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
