import { newExpectation, newShouldArgs } from "../helpers";
import { Expectation } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notBeVisible = newShouldArgs("not.be.visible");
export const notExist = newShouldArgs("not.exist");
export const exist = newShouldArgs("exist");
export const beVisibleAndContain = (value: string) =>
  newShouldArgs("be.visible.and.contain", value);
export const beChecked = newShouldArgs("be.checked");
export const notBeChecked = newShouldArgs("not.be.checked");

export const shouldFindAndBeVisible = (dataCy: string): Expectation =>
  newExpectation(`should find ${dataCy}`, `[data-cy=${dataCy}]`, beVisible);

export const shouldFindAndContains = (
  dataCy: string,
  text: string,
): Expectation =>
  newExpectation(
    `should find ${dataCy}`,
    `[data-cy=${dataCy}]`,
    beVisibleAndContain(text),
  );
