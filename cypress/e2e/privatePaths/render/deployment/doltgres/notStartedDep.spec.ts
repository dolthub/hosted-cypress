import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { doltgresConfig } from "../shared/deploymentConfigs";
import { notStartedDepTests } from "../shared/deploymentTestBuilders";

const pageName = "Doltgres deployment page for stopped deployment";
const { ownerName, depName } = doltgresConfig.stoppedDep;
const currentPage = `/deployments/${ownerName}/${depName}`;
const loggedIn = true;

describe(pageName, () => {
  const devices = allDevicesForAppLayout(
    pageName,
    notStartedDepTests(doltgresConfig),
    notStartedDepTests(doltgresConfig, true),
    false,
    true,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
