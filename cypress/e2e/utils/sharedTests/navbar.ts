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
  "[data-cy=navbar-discord]",
  "[data-cy=navbar-github]",
];

const signedInLinks = (
  databasePage: boolean,
  signedOutLayout = false,
): string[] => {
  if (databasePage) {
    return [
      "[data-cy=navbar-deployments]",
      "[data-cy=navbar-documentation]",
      "[data-cy=navbar-workbench-logo]",
      "[data-cy=database-exit-button]",
    ];
  }
  const common = [
    ...sharedLinks,
    "[data-cy=navbar-logo]",
    "[data-cy=navbar-deployments]",
    "[data-cy=navbar-menu-name]",
  ];
  if (signedOutLayout) {
    return common;
  }
  return [
    ...common,
    "[data-cy=navbar-settings]",
    "[data-cy=navbar-support]",
    "[data-cy=navbar-organizations]",
    "[data-cy=navbar-blog]",
    "[data-cy=sign-out-button-desktop]",
  ];
};

const signedOutLinks = [
  ...sharedLinks,
  "[data-cy=navbar-logo]",
  "[data-cy=navbar-signin]",
];

const signedInMobileLinks = (databasePage: boolean) => [
  ...sharedLinks,
  databasePage ? "[data-cy=navbar-workbench-logo]" : "[data-cy=navbar-logo]",
  "[data-cy=navbar-deployments]",
  "[data-cy=navbar-settings]",
  "[data-cy=sign-out-button-mobile]",
];

export const testSignedOutNavbar = (loggedIn = false): Tests => [
  newExpectation(
    "should have signed out navbar and correct links",
    loggedIn ? signedInLinks(false, true) : signedOutLinks,
    beVisible,
  ),
];

export const testSignedInNavbar = (
  databasePage: boolean,
  navClosed: boolean,
): Tests => [
  ...(navClosed
    ? [
        newExpectationWithClickFlows(
          "should open left nav menu",
          "[data-cy=left-navbar-open-button]",
          beVisible,
          [newClickFlow("[data-cy=left-navbar-open-button]", [])],
        ),
      ]
    : []),
  newExpectation(
    "should have signed in navbar and correct links",
    signedInLinks(databasePage),
    beVisible,
  ),
  ...(databasePage
    ? []
    : [
        newExpectation(
          "should have user name",
          "[data-cy=navbar-menu-name]",
          beVisible,
        ),
      ]),
];

const mobileNavbarClickFlow = (loggedIn: boolean, databasePage = false) =>
  newClickFlow(
    "[data-cy=mobile-navbar-menu-button]",
    [
      newExpectation(
        "should show links",
        loggedIn ? signedInMobileLinks(databasePage) : signedOutLinks,
        beVisible,
      ),
    ],
    "[data-cy=mobile-navbar-close-button]",
  );

export const testMobileNavbar = (
  loggedIn = false,
  databasePage = false,
): Tests => [
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
    [mobileNavbarClickFlow(loggedIn, databasePage)],
  ),
];
