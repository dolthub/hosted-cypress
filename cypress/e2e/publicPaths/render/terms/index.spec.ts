import {
  beVisibleAndContain,
  haveLength,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForSignedOutLayout } from "@utils/devices";
import { newExpectation } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Terms page";
const currentPage = "/terms";

describe(pageName, () => {
  const tests = [
    newExpectation(
      "should render terms page with title",
      "[data-cy=terms-page] header",
      beVisibleAndContain(["Terms Of Service", "Last Updated:"]),
    ),
    newExpectation(
      "should render terms page with 12 sections",
      "[data-cy=terms-page] section",
      haveLength(12),
    ),
  ];

  const devices = allDevicesForSignedOutLayout(pageName, tests, tests);

  runTestsForDevices({ currentPage, devices });
});
