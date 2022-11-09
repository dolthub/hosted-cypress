import {
  beVisibleAndContain,
  haveLength,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Privacy policy page";
const currentPage = "/privacy-policy";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render privacy policy page with title",
      "[data-cy=privacy-policy-page] header",
      beVisibleAndContain(["Privacy Policy", "Last Updated:"]),
    ),
    newExpectation(
      "should render privacy policy page with 8 sections",
      "[data-cy=privacy-policy-page] section",
      haveLength(8),
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
