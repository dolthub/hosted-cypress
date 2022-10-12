import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";
import { beVisible } from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Contact us page";
const currentPage = "/contact";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "should render contact us page with correct title",
      "[data-cy=contact-us-page]",
      newShouldArgs("be.visible.and.contain", [
        "Contact Us",
        "We usually respond within 24 hours",
      ]),
    ),
    newExpectation(
      "should have Discord button",
      "[data-cy=join-discord]",
      beVisible,
    ),
    newExpectation(
      "should have Email button",
      "[data-cy=send-email]",
      beVisible,
    ),
    newExpectation(
      "should have Report Bug link",
      "[data-cy=report-bug]",
      beVisible,
    ),
    newExpectation(
      "should have Support Ticket link",
      "[data-cy=support-ticket]",
      beVisible,
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
