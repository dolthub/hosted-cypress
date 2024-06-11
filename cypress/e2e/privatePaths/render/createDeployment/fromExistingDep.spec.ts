import {
  shouldBeVisible,
  shouldNotExist,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import { testAboutTab, testConfirmTab } from "@utils/sharedTests/createDep";

const pageName = "Create deployment page with existing deployment params";
const ownerName = "automated_testing";
const depName = "us-jails";
const currentPage = `/create-deployment?ownerName=${ownerName}&deploymentName=${depName}`;
const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldNotExist("no-subscription-banner"),
    shouldBeVisible("no-perm-banner"),
    shouldBeVisible("existing-deployment"),
    shouldBeVisible("existing-deployment-checkboxes"),
    shouldNotExist("backups-banner"),

    ...testAboutTab(ownerName, `${depName}-1`),
    // Skip to Confirm
    ...testConfirmTab(),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
