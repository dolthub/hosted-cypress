import { runTestsForDevices } from "../../../utils";
import { allDevicesForAppLayout } from "../../../utils/devices";
import { newExpectation, newShouldArgs } from "../../../utils/helpers";

const pageName = "Homepage";
const currentPage = "/";

describe(`${pageName} renders expected components on different devices`, () => {
  const tests = [
    
    newExpectation(
      "renders container",
      "[data-cy=homepage-container]",
      newShouldArgs(
        "be.visible.and.contain",
        "The easiest way to build with Dolt.",
      ),
    ),

  ];

  const devices = allDevicesForAppLayout(pageName, tests, tests);

  const skip = false;
  runTestsForDevices({ currentPage, devices, skip });
});
