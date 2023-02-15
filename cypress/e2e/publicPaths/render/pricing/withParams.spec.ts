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

const pageName = "Pricing Page with zone and instance type";
const zone = "us-east-1";
const instance = "r5b";
const currentPage = `/pricing?zone=${zone}&instance=${instance}`;

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
      currentValue: zone,
      selectorIdx: 2,
      optionIdx: 0,
      valueToClick: "us-west-2",
    },
    {
      dataCy: "instance-dropdown",
      currentValue: instance.toUpperCase(),
      selectorIdx: 5,
      optionIdx: 3,
      valueToClick: "T2",
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

    newExpectationWithScrollIntoView(
      "should find pricing dropdowns",
      "[data-cy=pricing-dropdowns]",
      beVisible,
      true,
    ),

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
      beVisibleAndContain("T2 Instances"),
      true,
    ),
  ];

  // TODO: Fix tests for other devices
  // const devices = allDevicesForAppLayout(pageName, tests, tests);
  const devices = [macbook15(pageName, tests)];

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
