import {
  newExpectation,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { Tests } from "../types";

const footerLinks = ["[data-cy=footer-privacy]", "[data-cy=footer-terms]"];

export const testFooter: Tests = [
  newExpectationWithScrollIntoView(
    "should scroll to footer",
    "[data-cy=footer]",
    newShouldArgs("be.visible"),
    true,
  ),
  newExpectation(
    "should have footer and correct links",
    footerLinks,
    newShouldArgs("be.visible"),
  ),
];
