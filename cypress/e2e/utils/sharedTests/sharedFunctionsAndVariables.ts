import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "../helpers";
import { Expectation } from "../types";

export const beVisible = newShouldArgs("be.visible");
export const notBeVisible = newShouldArgs("not.be.visible");
export const notExist = newShouldArgs("not.exist");
export const exist = newShouldArgs("exist");
export const beVisibleAndContain = (value: string | string[]) =>
  newShouldArgs("be.visible.and.contain", value);
export const beChecked = newShouldArgs("be.checked");
export const notBeChecked = newShouldArgs("not.be.checked");
export const haveLength = (length: number) =>
  newShouldArgs("be.visible.and.have.length", length);
export const haveLengthAtLeast = (length: number) =>
  newShouldArgs("be.visible.and.have.length.of.at.least", length);

export const shouldBeVisible = (dataCy: string, desc?: string): Expectation =>
  newExpectation(
    `should find ${desc ?? getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    beVisible,
  );

export const shouldFindAndContain = (
  dataCy: string,
  text: string | string[],
  desc?: string,
): Expectation =>
  newExpectation(
    `should find ${desc ?? getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    beVisibleAndContain(text),
  );

export const shouldNotExist = (dataCy: string): Expectation =>
  newExpectation(
    `should not find ${getDesc(dataCy)}`,
    `[data-cy=${dataCy}]`,
    notExist,
  );

export function shouldSelectOption(
  optionToSelect: string,
  selectorDataCy: string,
  selectorIdx: number,
  optionIdx: number,
  currentValue?: string,
): Expectation {
  return newExpectationWithClickFlows(
    `should select ${optionToSelect}`,
    `[data-cy=${selectorDataCy}]`,
    currentValue ? beVisibleAndContain(currentValue) : beVisible,
    [
      newClickFlow(
        `[data-cy=${selectorDataCy}]`,
        [
          newExpectation(
            `should have ${optionToSelect}`,
            `[id=react-select-${selectorIdx}-option-${optionIdx}]`,
            beVisibleAndContain(optionToSelect),
          ),
        ],
        `[id=react-select-${selectorIdx}-option-${optionIdx}]`,
      ),
    ],
  );
}

function getDesc(dataCy: string): string {
  return dataCy.replace(/-/g, " ");
}
