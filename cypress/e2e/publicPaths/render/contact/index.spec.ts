import {
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForAppLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";

const pageName = "Contact us page";
const currentPage = "/contact";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    shouldFindAndContain("contact-us-page", [
      "Contact Us",
      "We usually respond within 24 hours",
    ]),
    shouldBeVisible("join-discord", "Discord button"),
    shouldBeVisible("send-email", "Email button"),
    shouldBeVisible("report-bug", "Report Bug link"),
    shouldBeVisible("support-ticket", "Support Ticket link"),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);
  runTestsForDevices({ currentPage, devices });
});
