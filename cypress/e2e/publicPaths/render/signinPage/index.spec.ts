import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
} from "../../../utils/helpers";
import {
  beVisibleAndContain,
  findAndBeVisible,
  findAndContains,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";

const pageName = "Signinpage";
const currentPage = "/signin";

describe(`${pageName} renders expected components on different devices`, () => {
  const signUpBeVisibleDataCys = [
    "signin-forms",
    "signin-signin-google",
    "signin-username-input",
    "signin-passward-input",
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
    findAndContains("signin-tab", "Sign In"),

    ...signUpBeVisibleDataCys.map(dataCy => findAndBeVisible(dataCy)),

    newExpectationWithClickFlows(
      "should find recover text",
      "[data-cy=signin-forgot-password]",
      beVisibleAndContain("Forgot username or password?"),
      [
        newClickFlow("[data-cy=signin-forgot-password]", [
          ...recoverModalFindAndContains.map(test =>
            findAndContains(test.datacy, test.text),
          ),
          newExpectationWithClickFlows(
            "should close recover modal",
            "[data-cy=recover-cancel]",
            beVisibleAndContain("cancel"),
            [
              newClickFlow("[data-cy=recover-cancel]", [
                findAndContains(
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
      "[data-cy=signin-create-account]",
      beVisibleAndContain("Create one"),
      [
        newClickFlow("[data-cy=signin-create-account]", [
          findAndBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click to create account with email",
      "[data-cy=signin-create-account-email]",
      beVisibleAndContain("Sign up with Email"),
      [
        newClickFlow("[data-cy=signin-create-account-email]", [
          findAndBeVisible("signup-email-form"),
        ]),
      ],
    ),

    ...createAccountVisibleDataCys.map(dataCy => findAndBeVisible(dataCy)),

    findAndContains("create-account-with-email-button", "Sign up with Email"),

    newExpectationWithClickFlows(
      "should return back to create account tab",
      "[data-cy=signup-go-back]",
      beVisibleAndContain("Sign up with Google instead"),
      [
        newClickFlow("[data-cy=signup-go-back]", [
          findAndBeVisible("signin-create-account-google"),
        ]),
      ],
    ),

    newExpectationWithClickFlows(
      "should click on have account",
      "[data-cy=signin-have-account]",
      beVisibleAndContain("Sign in"),
      [
        newClickFlow("[data-cy=signin-have-account]", [
          findAndBeVisible("signin-signin-google"),
        ]),
      ],
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
