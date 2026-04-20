import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { monitoringTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment monitoring page";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=monitoring`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    monitoringTests(doltgresConfig),
    monitoringTests(doltgresConfig, true),
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
