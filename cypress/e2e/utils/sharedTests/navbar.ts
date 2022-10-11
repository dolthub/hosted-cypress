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

const signedInLinks = [
  ...sharedLinks,
  "[data-cy=navbar-deployments]",
  "[data-cy=navbar-organizations]",
];

const signedOutLinks = [...sharedLinks, "[data-cy=navbar-signin]"];

const signedOutMobileLinks = [
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-signin]",
];

const signedInMobileLinks = [
  "[data-cy=navbar-documentation]",
  "[data-cy=navbar-pricing]",
  "[data-cy=navbar-deployments]",
  "[data-cy=navbar-organizations]",
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

export const testSignedInNavbar: Tests = [
  newExpectation(
    "should have signed in navbar and correct links",
    signedInLinks,
    beVisible,
  ),
  newExpectation(
    "should have user name",
    "[data-cy=navbar-menu-name]",
    beVisible,
  ),
];

const mobileNavbarClickFlow = (signedIn: boolean) =>
  newClickFlow(
    "[data-cy=mobile-navbar-menu-button]",
    [
      newExpectation(
        "should show links",
        signedIn ? signedInMobileLinks : signedOutMobileLinks,
        beVisible,
      ),
    ],
    "[data-cy=mobile-navbar-close-button]",
  );

export const testMobileNavbar = (signedIn = false): Tests => [
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
    [mobileNavbarClickFlow(signedIn)],
  ),
];
