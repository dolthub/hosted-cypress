import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../utils/helpers";

const pageName = "PricingPage";
const currentPage = "/pricing";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const beVisibleAndContain = (value: string) =>
    newShouldArgs("be.visible.and.contain", value);

  const cards = ["Standard", "Large", "Enterprise"];
  const dropdowns = [
    {
      datacy: "zone-dropdown",
      currentValue: "us-west-2",
      optionId: "react-select-2-option-1",
      valueToClick: "us-east-1",
    },
    {
      datacy: "instance-dropdown",
      currentValue: "M4",
      optionId: "react-select-4-option-2",
      valueToClick: "R5B",
    },
  ];

  const tests = [
    newExpectation(
      "renders Info container",
      "[data-cy=info-container]",
      beVisible,
    ),

    newExpectation(
      "should find pricing header",
      "[data-cy=pricing-header",
      beVisibleAndContain("Pricing"),
    ),

    ...cards.map(card =>
      newExpectation(
        `should find ${card} Card`,
        `[data-cy=${card}-card]`,
        beVisibleAndContain(card),
      ),
    ),

    newExpectationWithScrollIntoView(
      "renders Table container",
      "[data-cy=table-container]",
      beVisible,
      true,
    ),

    newExpectation(
      "should find dropdowns",
      "[data-cy=pricing-dropdowns]",
      beVisible,
    ),

    ...dropdowns.map(dropdown =>
      newExpectationWithClickFlows(
        `show find and click on ${dropdown.datacy}`,
        `[data-cy=${dropdown.datacy}]`,
        beVisibleAndContain(dropdown.currentValue),
        [
          newClickFlow(`[data-cy=${dropdown.datacy}]`, [
            newExpectationWithClickFlows(
              `show find and click on ${dropdown.valueToClick}`,
              `[id=${dropdown.optionId}]`,
              beVisibleAndContain(dropdown.valueToClick),
              [
                newClickFlow(`[id=${dropdown.optionId}]`, [
                  newExpectation(
                    "should find dropdown with updated value",
                    `[data-cy=${dropdown.datacy}]`,
                    beVisibleAndContain(dropdown.valueToClick),
                  ),
                ]),
              ],
            ),
          ]),
        ],
      ),
    ),

    newExpectation(
      "should find left half pill button",
      "[data-cy=left-pill-toggle-button]",
      beVisibleAndContain("Hour"),
    ),

    newExpectation(
      "should find right half pill button",
      "[data-cy=right-pill-toggle-button]",
      beVisibleAndContain("Month"),
    ),

    newExpectationWithScrollIntoView(
      "should find current instance",
      "[data-cy=current-instance]",
      beVisibleAndContain("R5B Instances"),
      true,
    ),
  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
