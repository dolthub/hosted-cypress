import {
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  testAboutTab,
  testAdvancedTab,
  testConfirmTab,
  testInstanceTab,
} from "@utils/sharedTests/createDep";

const pageName = "Create deployment page with pricing params";
const cloud = "aws";
const zone = "us-east-1";
const instanceType = "t2.medium";
const instanceId = `${cloud}.${instanceType}`;
const currentPage = `/create-deployment?zone=${zone}&instanceId=${instanceId}`;
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("no-subscription-banner"),
    shouldNotExist("no-perm-banner"),
    shouldNotExist("existing-deployment"),
    shouldNotExist("backups-banner"),

    ...testAboutTab("cypresstesting", "test-dep", true),
    ...testInstanceTab(zone, instanceType, "Trial 50GB EBS"),
    ...testAdvancedTab(),
    ...testConfirmTab("0.07"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
