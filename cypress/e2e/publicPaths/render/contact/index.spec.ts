import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  shouldBeVisible,
  shouldFindAndContain,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Contact us page";
const currentPage = "/contact";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndContain("[data-cy=contact-us-page]", [
      "Contact Us",
      "We usually respond within 24 hours",
    ]),
    shouldBeVisible("[data-cy=join-discord]", "Discord button"),
    shouldBeVisible("[data-cy=send-email]", "Email button"),
    shouldBeVisible("[data-cy=report-bug]", "Report Bug link"),
    shouldBeVisible("[data-cy=support-ticket]", "Support Ticket link"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
