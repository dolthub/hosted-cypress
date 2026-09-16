// ***********************************************************
// This example support/index.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

// jQuery's :contains() matches substrings, so it cannot tell an option apart from
// one whose label merely starts with the same text -- picking "foo" out of a list
// that also holds "foo-old" returns both, and cy.click() refuses two elements.
// :exacttext() compares the trimmed text content instead.
Cypress.$.expr.pseudos.exacttext = Cypress.$.expr.createPseudo(
  (arg: string) => (el: Element) =>
    (el.textContent ?? "").trim() === arg.replace(/^["']|["']$/g, ""),
);
