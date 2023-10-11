import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newShouldArgs,
} from "@utils/helpers";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindButton,
  shouldNotBeVisible,
  shouldNotExist,
} from "./sharedFunctionsAndVariables";

const actionsClickFlow = (isStopped = false) =>
  newClickFlow(
    "[data-cy=actions-button]",
    [
      newExpectation(
        "should have update dolt button",
        "[data-cy=update-dolt-button]",
        isStopped ? newShouldArgs("is.disabled") : beVisible,
      ),
      shouldBeVisible("create-new-dep-button"),
      shouldBeVisible("reboot-instance-button"),
      shouldBeVisible("restart-dolt-button"),
      shouldBeVisible("create-support-ticket"),
      shouldFindButton("destroy-button", isStopped),
    ],
    `[data-cy=deployment-state-${isStopped ? "stopped" : "started"}]`,
  );

export const deploymentHeaderTests = (
  ownerName: string,
  depName: string,
  isStopped = false,
  isMobile = false,
) => [
  isMobile ? shouldNotBeVisible("utc-time") : shouldBeVisible("utc-time"),
  shouldFindAndContain("deployment-breadcrumbs", [ownerName, depName]),
  shouldBeVisible(`deployment-state-${isStopped ? "stopped" : "started"}`),
  shouldNotExist("deployment-starting-msg"),
  shouldBeVisible("dolt-version"),
  isStopped
    ? shouldNotExist("launch-workbench-button")
    : shouldBeVisible("launch-workbench-button"),
  newExpectationWithClickFlows(
    "should have actions button with items",
    "[data-cy=actions-button]",
    beVisible,
    [actionsClickFlow(isStopped)],
  ),
];
