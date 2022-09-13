import {
  findAndBeVisible,
  findAndContains,
} from "../../../utils/sharedTests/sharedFunctionsAndVariables";
import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import {
  newClickFlow,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../../../utils/helpers";

const pageName = "Pricing Page";
const currentPage = "/pricing";

describe(`${pageName} renders expected components on different devices`, () => {
  const beVisible = newShouldArgs("be.visible");
  const beVisibleAndContain = (value: string) =>
    newShouldArgs("be.visible.and.contain", value);

  const headerWithCardsFindAndContains = [
    {
      dataCy: "pricing-header",
      text: "Pricing",
    },
    {
      dataCy: "Standard-card",
      text: "Standard",
    },
    {
      dataCy: "Large-card",
      text: "Large",
    },
    {
      dataCy: "Enterprise-card",
      text: "Enterprise",
    },
  ];

  const pillsFindAndContains = [
    {
      datacy: "left-pill-toggle-button",
      text: "Hour",
    },
    {
      datacy: "right-pill-toggle-button",
      text: "Month",
    },
  ];

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
    findAndBeVisible("info-container"),

    ...headerWithCardsFindAndContains.map(find =>
      findAndContains(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Table container",
      "[data-cy=table-container]",
      beVisible,
      true,
    ),

    findAndBeVisible("pricing-dropdowns"),

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
                  findAndContains(dropdown.datacy, dropdown.valueToClick),
                ]),
              ],
            ),
          ]),
        ],
      ),
    ),

    ...pillsFindAndContains.map(find =>
      findAndContains(find.datacy, find.text),
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
