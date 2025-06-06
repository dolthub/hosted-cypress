// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

export const defaultTimeout = 10000;
const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
const clickOpts: Partial<Cypress.ClickOptions> = { scrollBehavior: false };

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

// Ensures page has loaded before running tests
// Reference: https://www.cypress.io/blog/2018/02/05/when-can-the-test-start/
Cypress.Commands.add("visitAndWait", (path: string) => {
  let appHasStarted = false;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function spyOnAddEventListener(win: any) {
    // win = window object in our application
    const addListener = win.EventTarget.prototype.addEventListener;
    win.EventTarget.prototype.addEventListener = function (name: string) {
      if (name === "change") {
        // web app added an event listener to the input box -
        // that means the web application has started
        appHasStarted = true;
        // restore the original event listener
        win.EventTarget.prototype.addEventListener = addListener;
      }
      return addListener.apply(this, arguments);
    };
  }

  function waitForAppStart() {
    // keeps rechecking "appHasStarted" variable
    return new Cypress.Promise((resolve, _) => {
      const isReady = () => {
        if (appHasStarted) {
          return resolve();
        }
        setTimeout(isReady, 0);
      };
      isReady();
    });
  }

  cy.visit(path, {
    onBeforeLoad: spyOnAddEventListener,
    failOnStatusCode: false,
  }).then(waitForAppStart);
});

Cypress.Commands.add(
  "loginAsCypressTestingAfterNavigateToSignin",
  (redirectValue?: string) => {
    if (!password || !username) {
      throw new Error("Username or password env not set");
    }
    cy.session(
      "hostedLogin",
      () => {
        cy.visitAndWait("/signin");
        completeLoginForCypressTesting();
        ensureSuccessfulLogin(redirectValue);
      },
      {
        cacheAcrossSpecs: true,
      },
    );
  },
);

function ensureSuccessfulLogin(redirectValue?: string) {
  // Must set cookie for localhost so navbar renders correctly
  if (Cypress.env("LOCAL")) {
    cy.setCookie("hostedToken", "fake-token");
  }
  if (redirectValue) {
    cy.location("pathname", opts).should("include", `/${redirectValue}`);
  } else {
    cy.location("pathname", opts).should("include", "/deployments");
  }
}

function completeLoginForCypressTesting() {
  // Check that email form has rendered
  cy.get("[data-cy=signin-email-form]", opts).should("be.visible");
  // Enter username and password in inputs
  cy.get("input[name=username]", opts)
    .should("be.visible")
    .type(username, { ...clickOpts, log: false });
  cy.get("input[name=username]").should("have.value", username);
  cy.get("input[name=password]", opts).should("be.visible");
  cy.get("input[name=password]", opts).type(password, {
    ...clickOpts,
    log: false,
  });
  cy.get("input[name=password]", opts).type("{enter}", clickOpts);
}

Cypress.Commands.add("handleGoogle", () => {
  // create the stub here
  const ga = cy.stub().as("ga");

  // prevent google analytics from loading and replace it with a stub before every
  // single page load including all new page navigations
  cy.on("window:before:load", win => {
    if (!Object.getOwnPropertyDescriptor(win, "ga")) {
      Object.defineProperty(win, "ga", {
        configurable: false,
        get: () => ga, // always return the stub
        set: () => {}, // don't allow actual google analytics to overwrite this property
      });
    }
  });
});

Cypress.Commands.add("visitPage", (currentPage: string, loggedIn: boolean) => {
  cy.handleGoogle();

  if (loggedIn) {
    // If page tests require a user to be logged in, go to signin page and log in test user
    cy.loginAsCypressTestingAfterNavigateToSignin();
  }

  // 404 page should be rendered when page not found
  cy.visitAndWait(currentPage);
});

Cypress.on(
  "uncaught:exception",
  err => !err.message.includes("ResizeObserver loop limit exceeded"),
);
