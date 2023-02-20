import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const beVisible = newShouldArgs("be.visible");

const sharedLinks = [
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-discord]",
  "[data-cy=navbar-github]",
];

const signedInLinks = (databasePage: boolean): string[] => {
  const links = [...sharedLinks, "[data-cy=navbar-deployments]"];
  if (databasePage) {
    return links;
  }
  return [
    ...links,
    "[data-cy=navbar-settings]",
    "[data-cy=navbar-support]",
    "[data-cy=navbar-organizations]",
    "[data-cy=navbar-blog]",
    "[data-cy=sign-out-button-desktop]",
  ];
};

const signedOutLinks = [...sharedLinks, "[data-cy=navbar-signin]"];

const signedInMobileLinks = [
  ...sharedLinks,
  "[data-cy=navbar-deployments]",
  "[data-cy=navbar-settings]",
  "[data-cy=sign-out-button-mobile]",
];

export const testSignedOutNavbar: Tests = [
  newExpectation(
    "should have signed out navbar and correct links",
    signedOutLinks,
    beVisible,
  ),
];

export const testSignedInNavbar = (databasePage: boolean): Tests => [
  newExpectation(
    "should have signed in navbar and correct links",
    signedInLinks(databasePage),
    beVisible,
  ),
  newExpectation(
    "should have user name",
    "[data-cy=navbar-menu-name]",
    beVisible,
  ),
];

const mobileNavbarClickFlow = (loggedIn: boolean) =>
  newClickFlow(
    "[data-cy=mobile-navbar-menu-button]",
    [
      newExpectation(
        "should show links",
        loggedIn ? signedInMobileLinks : signedOutLinks,
        beVisible,
      ),
    ],
    "[data-cy=mobile-navbar-close-button]",
  );

export const testMobileNavbar = (loggedIn = false): Tests => [
  newExpectationWithScrollIntoView(
    "should scroll to and show menu button on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    true,
  ),
  newExpectationWithClickFlows(
    "should show menu button and open nav on mobile",
    "[data-cy=mobile-navbar-menu-button]",
    beVisible,
    [mobileNavbarClickFlow(loggedIn)],
  ),
];
