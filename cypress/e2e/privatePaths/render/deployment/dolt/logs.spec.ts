import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { logsTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment logs page";
const { ownerName, depName } = doltConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=logs`;
const loggedIn = true;

// TODO: Logs query is too slow
const skip = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    logsTests(doltConfig),
    logsTests(doltConfig, true),
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
