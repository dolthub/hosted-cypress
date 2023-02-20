import {
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
} from "@sharedTests/sharedFunctionsAndVariables";
import { allDevicesForSignedOutLayout } from "@utils/devices";
import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Signin page";
const currentPage = "/signin";

describe(pageName, () => {
  const signUpBeVisibleDataCys = [
    "signin-forms",
    "signin-signin-google",
    "signin-username-input",
    "signin-password-input",
  ];
  const createAccountVisibleDataCys = [
    "create-account-email-input",
    "create-account-username-input",
    "create-account-password-input",
  ];

  const recoverModalFindAndContains = [
    {
      dataCy: "recover-msg",
      text: "Enter your email below to receive your username and a link to reset your password.",
    },
    {
      dataCy: "recover-password-submit-button",
      text: "Submit",
    },
  ];

  const tests = [
    shouldFindAndContain("signin-tab", "Sign In"),

    ...signUpBeVisibleDataCys.map(dataCy => shouldBeVisible(dataCy)),

    newExpectationWithClickFlows(
      "should find recover text",
      "[data-cy=signin-forgot-password]",
      beVisibleAndContain("Forgot username or password?"),
      [
        newClickFlow("[data-cy=signin-forgot-password]", [
          ...recoverModalFindAndContains.map(test =>
            shouldFindAndContain(test.dataCy, test.text),
          ),
          newExpectationWithClickFlows(
            "should close recover modal",
            "[data-cy=recover-cancel]",
            beVisibleAndContain("cancel"),
            [
              newClickFlow("[data-cy=recover-cancel]", [
                shouldFindAndContain(
                  "signin-forgot-password",
                  "Forgot username or password?",
                ),
              ]),
            ],
          ),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click to create one",
      "[data-cy=signin-create-account-button]",
      beVisibleAndContain("Create one"),
      [
        newClickFlow("[data-cy=signin-create-account-button]", [
          shouldBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click to create account with email",
      "[data-cy=signin-create-account-email]",
      beVisibleAndContain("Sign up with Email"),
      [
        newClickFlow("[data-cy=signin-create-account-email]", [
          shouldBeVisible("signup-email-form"),
        ]),
      ],
    ),

    ...createAccountVisibleDataCys.map(dataCy => shouldBeVisible(dataCy)),

    shouldFindAndContain(
      "create-account-with-email-button",
      "Sign up with Email",
    ),

    newExpectationWithClickFlows(
      "should return back to create account tab",
      "[data-cy=signup-go-back]",
      beVisibleAndContain("Sign up with Google instead"),
      [
        newClickFlow("[data-cy=signup-go-back]", [
          shouldBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click on have account",
      "[data-cy=signin-have-account]",
      beVisibleAndContain("Sign in"),
      [
        newClickFlow("[data-cy=signin-have-account]", [
          shouldBeVisible("signin-signin-google"),
        ]),
      ],
    ),
  ];

  const devices = allDevicesForSignedOutLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
