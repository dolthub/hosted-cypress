import { newDevice } from "./helpers";
import { testFooter } from "./sharedTests/footer";
import {
  testMobileNavbar,
  testSignedInNavbar,
  testSignedOutNavbar,
} from "./sharedTests/navbar";
import { Device, Tests } from "./types";

// Creates devices

export const macbook15 = (pageName: string, tests: Tests) =>
  newDevice(
    "macbook-15",
    `${pageName} renders expected components on macbook-15`,
    tests,
    false,
  );

export const macbook11 = (pageName: string, tests: Tests) =>
  newDevice(
    "macbook-11",
    `${pageName} renders expected components on macbook-11`,
    tests,
    false,
  );

export const iPad2 = (pageName: string, tests: Tests) =>
  newDevice(
    "ipad-2",
    `${pageName} renders expected components on ipad-2`,
    tests,
    true,
  );

export const iPhoneX = (pageName: string, tests: Tests) =>
  newDevice(
    "iphone-x",
    `${pageName} renders expected components on iphone-x`,
    tests,
    true,
  );

// Signed out layout

export const macbook15ForSignedOutLayout = (
  pageName: string,
  tests: Tests,
): Device => {
  const t = getSignedOutLayoutTests(tests);
  return macbook15(pageName, t);
};

export const iPad2ForSignedOutLayout = (
  pageName: string,
  tests: Tests,
): Device => iPad2(pageName, getSignedOutLayoutTestsMobile(tests));

export const iPhoneXForSignedOutLayout = (
  pageName: string,
  tests: Tests,
): Device => iPhoneX(pageName, getSignedOutLayoutTestsMobile(tests));

export const mobileDevicesForSignedOutLayout = (
  pageName: string,
  tests: Tests,
  loggedIn = false,
): Device[] => {
  const t = getSignedOutLayoutTestsMobile(tests, loggedIn);
  return [iPad2(pageName, t), iPhoneX(pageName, t)];
};

export const desktopDevicesForSignedOutLayout = (
  pageName: string,
  tests: Tests,
  loggedIn = false,
): Device[] => {
  const t = getSignedOutLayoutTests(tests, loggedIn);
  return [macbook15(pageName, t), macbook11(pageName, t)];
};

export const allDevicesForSignedOutLayout = (
  pageName: string,
  desktopTests: Tests,
  mobileTests: Tests,
  loggedIn = false,
): Device[] => [
  ...desktopDevicesForSignedOutLayout(pageName, desktopTests, loggedIn),
  ...mobileDevicesForSignedOutLayout(pageName, mobileTests, loggedIn),
];

function getSignedOutLayoutTests(tests: Tests, loggedIn = false): Tests {
  return [...testSignedOutNavbar(loggedIn), ...tests, ...testFooter];
}

function getSignedOutLayoutTestsMobile(tests: Tests, loggedIn = false): Tests {
  return [...testMobileNavbar(loggedIn), ...tests, ...testFooter];
}

// App layout, must be logged in
// Database page has different navbar and no footer

export const macbook15ForAppLayout = (
  pageName: string,
  tests: Tests,
  databasePage = false,
  navClosed = false,
): Device => {
  const t = getAppLayoutTests(tests, databasePage, navClosed);
  return macbook15(pageName, t);
};

export const iPad2ForAppLayout = (
  pageName: string,
  tests: Tests,
  databasePage = false,
): Device => iPad2(pageName, getAppLayoutTestsMobile(tests, databasePage));

export const iPhoneXForAppLayout = (
  pageName: string,
  tests: Tests,
  databasePage = false,
): Device => iPhoneX(pageName, getAppLayoutTestsMobile(tests, databasePage));

export const mobileDevicesForAppLayout = (
  pageName: string,
  tests: Tests,
  databasePage = false,
): Device[] => {
  const t = getAppLayoutTestsMobile(tests, databasePage);
  return [iPad2(pageName, t), iPhoneX(pageName, t)];
};

export const desktopDevicesForAppLayout = (
  pageName: string,
  tests: Tests,
  databasePage = false,
  navClosed = false,
): Device[] => {
  const t = getAppLayoutTests(tests, databasePage, navClosed);
  return [macbook15(pageName, t), macbook11(pageName, t)];
};

export const allDevicesForAppLayout = (
  pageName: string,
  desktopTests: Tests,
  mobileTests: Tests,
  databasePage = false,
  navClosed = false,
): Device[] => [
  ...desktopDevicesForAppLayout(
    pageName,
    desktopTests,
    databasePage,
    navClosed,
  ),
  ...mobileDevicesForAppLayout(pageName, mobileTests),
];

function getAppLayoutTests(
  tests: Tests,
  databasePage: boolean,
  navClosed: boolean,
): Tests {
  if (databasePage) return [...testSignedInNavbar(true, false), ...tests];
  return [...testSignedInNavbar(false, navClosed), ...tests, ...testFooter];
}

function getAppLayoutTestsMobile(tests: Tests, databasePage: boolean): Tests {
  if (databasePage) return [...testMobileNavbar(true, databasePage), ...tests];
  return [...testMobileNavbar(true), ...tests, ...testFooter];
}
