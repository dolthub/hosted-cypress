import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Non-existent deployment";
const ownerName = "dolthub";
const doesNotExistDep = "doesnt-exist";
const currentPage = `deployments/${ownerName}/${doesNotExistDep}`;
const loggedIn = true;
const skip = false;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain(
      "404-page",
      `Deployment "${ownerName}/${doesNotExistDep}" not found`,
    ),
    shouldNotExist("deployment-breadcrumbs"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests, false, true);
  runTestsForDevices({ currentPage, devices, skip, loggedIn });
});
