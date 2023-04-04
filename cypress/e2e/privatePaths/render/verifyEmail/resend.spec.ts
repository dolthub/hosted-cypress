import { allDevicesForSignedOutLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldFindButton,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Resend verification email page";
const user = "cypresstesting";
const email = "taylor+testing@dolthub.com";
const currentPage = `users/${user}/emailAddresses/${email}/verify`;

const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("resend-verification-email", [
      `Resend verification email for ${user}`,
      email,
    ]),
    shouldNotExist("verify-email"),
    shouldFindButton("resend-verification-button"),
  ];
  const devices = allDevicesForSignedOutLayout(
    pageName,
    tests,
    tests,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
