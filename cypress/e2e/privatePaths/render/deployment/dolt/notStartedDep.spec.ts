import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltConfig } from "../shared/deploymentConfigs";
import { notStartedDepTests } from "../shared/deploymentTestBuilders";

const pageName = "Deployment page for stopped deployment";
const { ownerName, depName } = doltConfig.stoppedDep;
const currentPage = `/deployments/${ownerName}/${depName}`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    notStartedDepTests(doltConfig),
    notStartedDepTests(doltConfig, true),
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
