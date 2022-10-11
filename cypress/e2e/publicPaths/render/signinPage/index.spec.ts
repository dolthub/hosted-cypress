import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
} from "../../../utils/helpers";
import {
  beVisibleAndContain,
  shouldFindAndBeVisible,
  shouldFindAndContains,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Signin page";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
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
      datacy: "recover-msg",
      text: "Enter your email below to receive your username and a link to reset your password.",
    },
    {
      datacy: "recover-password-submit-button",
      text: "Submit",
    },
  ];

  const tests = [
    shouldFindAndContains("signin-tab", "Sign In"),

    ...signUpBeVisibleDataCys.map(dataCy => shouldFindAndBeVisible(dataCy)),

    newExpectationWithClickFlows(
      "should find recover text",
      "[data-cy=signin-forgot-password]",
      beVisibleAndContain("Forgot username or password?"),
      [
        newClickFlow("[data-cy=signin-forgot-password]", [
          ...recoverModalFindAndContains.map(test =>
            shouldFindAndContains(test.datacy, test.text),
          ),
          newExpectationWithClickFlows(
            "should close recover modal",
            "[data-cy=recover-cancel]",
            beVisibleAndContain("cancel"),
            [
              newClickFlow("[data-cy=recover-cancel]", [
                shouldFindAndContains(
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
          shouldFindAndBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click to create account with email",
      "[data-cy=signin-create-account-email]",
      beVisibleAndContain("Sign up with Email"),
      [
        newClickFlow("[data-cy=signin-create-account-email]", [
          shouldFindAndBeVisible("signup-email-form"),
        ]),
      ],
    ),

    ...createAccountVisibleDataCys.map(dataCy =>
      shouldFindAndBeVisible(dataCy),
    ),

    shouldFindAndContains(
      "create-account-with-email-button",
      "Sign up with Email",
    ),

    newExpectationWithClickFlows(
      "should return back to create account tab",
      "[data-cy=signup-go-back]",
      beVisibleAndContain("Sign up with Google instead"),
      [
        newClickFlow("[data-cy=signup-go-back]", [
          shouldFindAndBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click on have account",
      "[data-cy=signin-have-account]",
      beVisibleAndContain("Sign in"),
      [
        newClickFlow("[data-cy=signin-have-account]", [
          shouldFindAndBeVisible("signin-signin-google"),
        ]),
      ],
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
