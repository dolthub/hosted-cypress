import {
  ClickFlow,
  Devices,
  Expectation,
  ScrollTo,
  ShouldArgs,
  Tests,
  TypeStringType,
} from "./types";

// defaultTimeout is the time in ms cypress will wait attempting
// to .get() an element before failing
export const defaultTimeout = 5000;
export const opts: Partial<Cypress.Timeoutable> = {
  timeout: defaultTimeout,
};
export const getOpts = (
  timeout = defaultTimeout,
): Partial<Cypress.Timeoutable> => ({
  timeout,
});
export const clickOpts: Partial<Cypress.ClickOptions> = {
  scrollBehavior: false,
};

const username = Cypress.env("TEST_USERNAME");
const password = Cypress.env("TEST_PASSWORD");

export const deviceDimensions: Record<
  Cypress.ViewportPreset,
  Cypress.Viewport
> = {
  "macbook-15": { viewportWidth: 1440, viewportHeight: 900 },
  "macbook-16": { viewportWidth: 1536, viewportHeight: 960 },
  "macbook-13": { viewportWidth: 1280, viewportHeight: 800 },
  "macbook-11": { viewportWidth: 1366, viewportHeight: 768 },
  "ipad-2": { viewportWidth: 768, viewportHeight: 1024 },
  "ipad-mini": { viewportWidth: 768, viewportHeight: 1024 },
  "iphone-xr": { viewportWidth: 414, viewportHeight: 896 },
  "iphone-x": { viewportWidth: 375, viewportHeight: 812 },
  "iphone-6+": { viewportWidth: 414, viewportHeight: 736 },
  "iphone-se2": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-8": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-7": { viewportWidth: 375, viewportHeight: 667 },
  "iphone-3": { viewportWidth: 320, viewportHeight: 480 },
  "iphone-4": { viewportWidth: 320, viewportHeight: 480 },
  "iphone-5": { viewportWidth: 320, viewportHeight: 568 },
  "iphone-6": { viewportWidth: 375, viewportHeight: 667 },
  "samsung-note9": { viewportWidth: 414, viewportHeight: 846 },
  "samsung-s10": { viewportWidth: 360, viewportHeight: 760 },
};

// RUN TESTS

type TestsArgs = {
  tests: Tests;
};

export function runTests({ tests }: TestsArgs) {
  tests.forEach(t => {
    cy.log(t.description);

    if (t.skip) return;

    testAssertion(t);

    if (t.clickFlows) {
      testClickFlows({
        clickFlows: t.clickFlows,
        description: t.description,
        timeout: t.timeout,
      });
    }

    if (t.scrollTo) {
      handleScrollTo(t.scrollTo);
    }
  });
}

type TestsForDevicesArgs = {
  currentPage: string;
  devices: Devices;
  loggedIn?: boolean;
  skip?: boolean;
};

export function runTestsForDevices({
  devices,
  currentPage,
  loggedIn = false,
  skip = false,
}: TestsForDevicesArgs) {
  beforeEach(() => {
    // Visit page and log in if needed
    cy.visitPage(currentPage, loggedIn);
  });

  devices.forEach(d => {
    // Skip tests that require login if username and password not found
    const skipForLogin = loggedIn && (!username || !password);
    if (skip || skipForLogin) {
      xit(d.description, deviceDimensions[d.device], () => {
        runTests(d);
      });
    } else {
      it(d.description, deviceDimensions[d.device], () => {
        runTests(d);
      });
    }
  });
}

// HELPER FUNCTIONS

function testAssertion(t: Expectation) {
  if (Array.isArray(t.selector)) {
    return t.selector.forEach(s =>
      getAssertionTest(
        t.description,
        s,
        t.shouldArgs,
        t.typeString,
        t.selectOption,
        t.targetPage,
        t.url,
        t.scrollIntoView,
        t.timeout,
      ),
    );
  }
  return getAssertionTest(
    t.description,
    t.selector,
    t.shouldArgs,
    t.typeString,
    t.selectOption,
    t.targetPage,
    t.url,
    t.scrollIntoView,
    t.timeout,
  );
}

function getAssertionTest(
  description: string,
  selectorStr: string,
  shouldArgs: ShouldArgs,
  typeString?: TypeStringType,
  selectOption?: number,
  targetPage?: string,
  url?: string,
  scrollIntoView?: boolean,
  timeout?: number,
) {
  const message = `
  Test assertion failed... 
  related test: ${description},
  related selector: ${selectorStr},
`;
  const o = getOpts(timeout);
  if (typeString) {
    if (typeString.eq) {
      return cy
        .get(selectorStr, o)
        .eq(typeString.eq)
        .type(typeString.value, clickOpts);
    }
    if (!typeString.skipClear) {
      cy.get(selectorStr, o).clear(clickOpts);
      return cy.get(selectorStr, o).type(typeString.value, clickOpts);
    }
    return cy.get(selectorStr, o).type(typeString.value, clickOpts);
  }

  if (selectOption !== undefined) {
    cy.get(selectorStr).eq(selectOption).click();
  }
  if (targetPage) {
    cy.visitPage(targetPage, false);
  }
  if (url) {
    const base = Cypress.config().baseUrl;
    cy.location("href", o).should("eq", `${base}${url}`);
  }
  if (scrollIntoView) {
    scrollSelectorIntoView(selectorStr, timeout);
  }
  if (Array.isArray(shouldArgs.value)) {
    if (shouldArgs.chainer !== "be.visible.and.contain") {
      throw new Error(
        "Value array can only be used with be.visible.and.contain",
      );
    }
    return cy
      .get(selectorStr, o)
      .should("be.visible")
      .should($el => {
        shouldArgs.value.forEach((v: string) => {
          expect($el).to.contain(v, message);
        });
      });
  }
  return cy
    .get(selectorStr, o)
    .should(shouldArgs.chainer, shouldArgs.value, { message });
}

type ClickFlowsArgs = {
  description: string;
  clickFlows?: ClickFlow[];
  timeout?: number;
};

// testClickFlows recursively runs clickFlow tests
// clicking each toClickBefore first, then making assertions
// the clicking each toClickAfter
export function testClickFlows({
  description,
  clickFlows,
  timeout,
}: ClickFlowsArgs) {
  if (!clickFlows) return;
  cy.log(description);

  clickFlows.forEach(({ toClickBefore, expectations, toClickAfter, force }) => {
    if (toClickBefore) runClicks(toClickBefore, force, timeout);

    expectations.forEach(t => {
      testAssertion(t);
      testClickFlows({
        description,
        clickFlows: t.clickFlows,
        timeout: t.timeout,
      });
    });

    if (toClickAfter) runClicks(toClickAfter, false, timeout);
  });
}

// runClicks clicks on each selectorStr
function runClicks(
  clickStrOrArr: string | string[],
  force?: boolean,
  timeout?: number,
) {
  const cOpts = { ...clickOpts, force };
  const o = getOpts(timeout);
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, o).click(cOpts);
    });
  } else {
    cy.get(clickStrOrArr, o).click(cOpts);
  }
}

// scrollSelectorIntoView scrolls the selector into view
function scrollSelectorIntoView(
  clickStrOrArr: string | string[],
  timeout?: number,
) {
  const o = getOpts(timeout);
  if (Array.isArray(clickStrOrArr)) {
    clickStrOrArr.forEach(clickStr => {
      cy.get(clickStr, o).scrollIntoView();
    });
  } else {
    cy.get(clickStrOrArr, o).scrollIntoView();
  }
}

// handleScrollTo scrolls to the given selector string and the designated position
function handleScrollTo(scrollTo: ScrollTo) {
  if ("position" in scrollTo) {
    if (scrollTo.selectorStr) {
      return cy
        .get(scrollTo.selectorStr)
        .scrollTo(scrollTo.position, scrollTo.options);
    }
    return cy.scrollTo(scrollTo.position, scrollTo.options);
  }

  if ("x" in scrollTo && "y" in scrollTo) {
    if (scrollTo.selectorStr) {
      return cy
        .get(scrollTo.selectorStr)
        .scrollTo(scrollTo.x, scrollTo.y, scrollTo.options);
    }
    return cy.scrollTo(scrollTo.x, scrollTo.y, scrollTo.options);
  }

  if ("selectorStr" in scrollTo) {
    return cy.get(scrollTo.selectorStr).scrollIntoView(scrollTo.options);
  }
  throw new Error(`invalid scrollTo type: ${scrollTo}`);
}
