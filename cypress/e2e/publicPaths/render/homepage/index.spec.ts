import {
  beVisibleAndContain,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForSignedOutLayout } from "@utils/devices";
import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Homepage";
const currentPage = "/";

describe(pageName, () => {
  const topContainerFindAndContains = [
    { dataCy: "top-container", text: "The easiest way to build with Dolt." },
    { dataCy: "top-database-button", text: "Launch a database" },
    { dataCy: "top-pricing-button", text: "View pricing" },
  ];

  const featuresFindAndContains = [
    { dataCy: "features-link-awsRDS", text: "AWS RDS" },
    { dataCy: "features-link-mariaDB", text: "MariaDB SkySQL" },
    { dataCy: "features-link-team", text: "Learn about the team " },
  ];

  const tests = [
    ...topContainerFindAndContains.map(find =>
      shouldFindAndContain(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Steps header",
      "[data-cy=steps-container]",
      beVisibleAndContain("Get started in minutes"),
      true,
    ),

    shouldFindAndContain("steps-container", "Watch the Video"),

    newExpectationWithScrollIntoView(
      "should scroll to Features header",
      "[data-cy=features-container]",
      beVisibleAndContain("Let the Dolt experts run your database for you"),
      true,
    ),

    ...featuresFindAndContains.map(find =>
      shouldFindAndContain(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should scroll to Compare Header",
      "[data-cy=compare-container",
      newShouldArgs("be.visible.and.contain", "Which Dolt is right for you?"),
      true,
    ),

    newExpectation(
      "should find table links for each dolt service",
      "[data-cy=compare-container]",
      newShouldArgs("be.visible.and.contain", [
        "Visit DoltHub",
        "Get started",
        "Launch a database",
      ]),
    ),
  ];

  const devices = allDevicesForSignedOutLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
