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

const pageName = "Create deployment page";
const currentPage = "/create-deployment";
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldBeVisible("no-subscription-banner"),
    shouldNotExist("no-perm-banner"),
    shouldNotExist("from-backup-link"),
    shouldNotExist("existing-creation-method"),

    ...testAboutTab("cypresstesting", "test-dep", true),
    ...testInstanceTab(),
    ...testAdvancedTab(),
    ...testConfirmTab(),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
