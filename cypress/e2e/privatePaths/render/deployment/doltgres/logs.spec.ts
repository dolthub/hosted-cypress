import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { logsTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment logs page";
const { ownerName, depName } = doltgresConfig;
const currentPage = `/deployments/${ownerName}/${depName}?tab=logs`;
const loggedIn = true;

// TODO: Logs query is too slow
const skip = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    logsTests(doltgresConfig),
    logsTests(doltgresConfig, true),
  );
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
