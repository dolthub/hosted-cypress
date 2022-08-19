import { newDevice } from "./helpers";
import { testFooter } from "./sharedTests/footer";
import {
  testMobileNavbar,
  testSignedInNavbar,
  testSignedOutNavbar,
} from "./sharedTests/navbar";
import { Device, Tests } from "./types";

// Creates devices

export const macbook15 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "macbook-15",
    `${pageName} renders expected components on macbook-15`,
    loggedIn,
    tests,
    false,
  );

export const macbook11 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "macbook-11",
    `${pageName} renders expected components on macbook-11`,
    loggedIn,
    tests,
    false,
  );

export const iPad2 = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "ipad-2",
    `${pageName} renders expected components on ipad-2`,
    loggedIn,
    tests,
    true,
  );

export const iPhoneX = (pageName: string, tests: Tests, loggedIn: boolean) =>
  newDevice(
    "iphone-x",
    `${pageName} renders expected components on iphone-x`,
    loggedIn,
    tests,
    true,
  );

// App layout
export const macbook15ForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
): Device => {
  const t = getAppLayoutTests(tests, skipNavbar, skipFooter, loggedIn);
  return macbook15(pageName, t, loggedIn);
};

export const iPad2ForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
): Device =>
  iPad2(
    pageName,
    getAppLayoutTestsMobile(tests, skipNavbar, skipFooter, loggedIn),
    loggedIn,
  );

export const iPhoneXForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
): Device =>
  iPhoneX(
    pageName,
    getAppLayoutTestsMobile(tests, skipNavbar, skipFooter, loggedIn),
    loggedIn,
  );

export const mobileDevicesForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
) => {
  const t = getAppLayoutTestsMobile(tests, skipNavbar, skipFooter, loggedIn);
  return [iPad2(pageName, t, loggedIn), iPhoneX(pageName, t, loggedIn)];
};

export const desktopDevicesForAppLayout = (
  pageName: string,
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
  hasClosedLeftNav = false,
) => {
  const t = getAppLayoutTests(
    tests,
    skipNavbar,
    skipFooter,
    loggedIn,
    hasClosedLeftNav,
  );
  return [macbook15(pageName, t, loggedIn), macbook11(pageName, t, loggedIn)];
};

export const allDevicesForAppLayout = (
  pageName: string,
  desktopTests: Tests,
  mobileTests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
  hasClosedLeftNav = false,
) => [
  ...desktopDevicesForAppLayout(
    pageName,
    desktopTests,
    skipNavbar,
    skipFooter,
    loggedIn,
    hasClosedLeftNav,
  ),
  ...mobileDevicesForAppLayout(
    pageName,
    mobileTests,
    skipNavbar,
    skipFooter,
    loggedIn,
  ),
];

function getAppLayoutTests(
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
  hasClosedLeftNav = false,
) {
  if (skipNavbar && skipFooter) return tests;
  if (skipNavbar) return [...tests, ...testFooter];
  const navbarTests = loggedIn
    ? testSignedInNavbar(hasClosedLeftNav)
    : testSignedOutNavbar;
  if (skipFooter) return [...navbarTests, ...tests];
  return [...navbarTests, ...tests, ...testFooter];
}

function getAppLayoutTestsMobile(
  tests: Tests,
  skipNavbar = false,
  skipFooter = false,
  loggedIn = false,
) {
  if (skipNavbar && skipFooter) return tests;
  if (skipFooter) return [...testMobileNavbar(loggedIn), ...tests];
  if (skipNavbar) return [...tests, ...testFooter];
  return [...testMobileNavbar(loggedIn), ...tests, ...testFooter];
}
