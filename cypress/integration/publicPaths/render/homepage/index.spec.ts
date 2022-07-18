import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../utils/helpers";

const pageName = "Homepage";
const currentPage = "/";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    newExpectation(
      "renders container",
      "[data-cy=top-container]",
      newShouldArgs(
        "be.visible.and.contain",
        "The easiest way to build with Dolt.",
      ),
    ),
    newExpectation(
      "Should find top button",
      "[data-cy=top-database-button",
      newShouldArgs("be.visible.and.contain", "Launch a database"),
    ),
    newExpectation(
      "Should find top link",
      "[data-cy=top-pricing-button]",
      newShouldArgs("be.visible.and.contain", "View pricing"),
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Steps header",
      "[data-cy=steps-container]",
      newShouldArgs("be.visible.and.contain", "Get started in minutes"),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Features header",
      "[data-cy=features-container]",
      newShouldArgs(
        "be.visible.and.contain",
        "Let the Dolt experts run your database for you",
      ),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Features aws link",
      "[data-cy=features-link-awsRDS]",
      newShouldArgs("be.visible.and.contain", "AWS RDS"),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Features mariaDB link",
      "[data-cy=features-link-mariaDB]",
      newShouldArgs("be.visible.and.contain", "MariaDB SkySQL"),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Features team link",
      "[data-cy=features-link-team]",
      newShouldArgs("be.visible.and.contain", "Learn about the team"),
      true,
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Compare Header",
      "[data-cy=compare-container",
      newShouldArgs("be.visible.and.contain", "Which Dolt is right for you?"),
      true,
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
