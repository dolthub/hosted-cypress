import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { workbenchTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment workbench page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=workbench`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    workbenchTests(doltConfig),
    workbenchTests(doltConfig, true),
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
