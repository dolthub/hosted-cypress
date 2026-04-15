import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { connectivityTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment database page, connectivity section";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;
const loggedIn = true;

describe(pageName, () => {
  const tests = connectivityTests(doltConfig);
  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
