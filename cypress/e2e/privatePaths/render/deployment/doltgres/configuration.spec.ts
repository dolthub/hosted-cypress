import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { configurationTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment database page, configuration section";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=configuration`;
const loggedIn = true;

describe(pageName, () => {
  const tests = configurationTests();
  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
