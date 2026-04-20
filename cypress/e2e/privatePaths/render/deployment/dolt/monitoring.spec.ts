import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { monitoringTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment monitoring page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=monitoring`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    monitoringTests(doltConfig),
    monitoringTests(doltConfig, true),
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
