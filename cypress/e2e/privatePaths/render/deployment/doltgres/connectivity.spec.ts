import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { connectivityTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment database page, connectivity section";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=connectivity`;
const loggedIn = true;

describe(pageName, () => {
  const tests = connectivityTests(doltgresConfig);
  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
