import {
  beVisible,
  beVisibleAndContain,
  shouldBeVisible,
  shouldFindAndContain,
  shouldSelectOption,
} from "@sharedTests/sharedFunctionsAndVariables";
import { macbook15 } from "@utils/devices";
import { newExpectationWithScrollIntoView } from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";

const pageName = "Pricing Page";
const currentPage = "/pricing";

describe(pageName, () => {
  const headerWithCardsFindAndContains = [
    {
      dataCy: "pricing-header",
      text: "Pricing",
    },
    {
      dataCy: "Trial-card",
      text: "Trial",
    },
    {
      dataCy: "Standard-card",
      text: "Standard",
    },
    {
      dataCy: "Enterprise-card",
      text: "Enterprise",
    },
  ];

  const pillsFindAndContains = [
    {
      dataCy: "left-pill-toggle-button",
      text: "Hour",
    },
    {
      dataCy: "right-pill-toggle-button",
      text: "Month",
    },
  ];

  const dropdowns = [
    {
      dataCy: "zone-dropdown",
      currentValue: "us-west-2",
      selectorIdx: 3,
      optionIdx: 1,
      valueToClick: "us-east-1",
    },
    {
      dataCy: "instance-dropdown",
      currentValue: "M4",
      selectorIdx: 7,
      optionIdx: 2,
      valueToClick: "R5B",
    },
  ];

  const tests = [
    shouldBeVisible("info-container"),

    ...headerWithCardsFindAndContains.map(find =>
      shouldFindAndContain(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find Table container",
      "[data-cy=table-container]",
      beVisible,
      true,
    ),

    shouldBeVisible("pricing-dropdowns"),

    shouldFindAndContain("cloud-select", ["Cloud", "AWS"]),

    ...dropdowns.map(d =>
      shouldSelectOption(
        d.valueToClick,
        d.dataCy,
        d.selectorIdx,
        d.optionIdx,
        d.currentValue,
      ),
    ),

    ...pillsFindAndContains.map(find =>
      shouldFindAndContain(find.dataCy, find.text),
    ),

    newExpectationWithScrollIntoView(
      "should find current instance",
      "[data-cy=current-instance]",
      beVisibleAndContain("R5B Instances"),
      true,
    ),
  ];

  // TODO: Fix tests for other devices
  // const devices = allDevicesForAppLayout(pageName, tests, tests);
  const devices = [macbook15(pageName, tests)];

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
