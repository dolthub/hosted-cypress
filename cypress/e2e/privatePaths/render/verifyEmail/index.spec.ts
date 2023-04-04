import { allDevicesForSignedOutLayout } from "@utils/devices";
import { runTestsForDevices } from "@utils/index";
import {
  shouldFindAndContain,
  shouldFindButton,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Verify email page";
const user = "cypresstesting";
const email = "taylor+testing@dolthub.com";
const token = "fake-token";
const currentPage = `users/${user}/emailAddresses/${email}/verify?token=${token}`;

const loggedIn = true;

describe(pageName, () => {
  const tests = [
    shouldFindAndContain("verify-email", [
      `Email verification for ${user}`,
      email,
    ]),
    shouldNotExist("resend-verification-email"),
    shouldFindButton("verify-email-button"),
  ];
  const devices = allDevicesForSignedOutLayout(
    pageName,
    tests,
    tests,
    loggedIn,
  );
  runTestsForDevices({ currentPage, devices, loggedIn });
});
