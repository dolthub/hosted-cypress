import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { indexTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    indexTests(doltConfig),
    indexTests(doltConfig, true),
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
