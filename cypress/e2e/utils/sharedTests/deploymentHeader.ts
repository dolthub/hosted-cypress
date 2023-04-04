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
      newExpectation(
        `should have ${
          isStopped ? "disabled" : "enabled"
        } destroy deployment button`,
        "[data-cy=destroy-button]",
        newShouldArgs(isStopped ? "be.disabled" : "be.enabled"),
      ),
    ],
    `[data-cy=deployment-state-${isStopped ? "stopped" : "started"}]`,
  );

export const deploymentHeaderTests = (
  ownerName: string,
  depName: string,
  isStopped = false,
) => [
  shouldBeVisible("back-to-deps-link"),
  shouldBeVisible("utc-time"),
  shouldFindAndContain("deployment-breadcrumbs", [ownerName, depName]),
  shouldBeVisible(`deployment-state-${isStopped ? "stopped" : "started"}`),
  shouldNotExist("deployment-starting-msg"),
  shouldBeVisible("deployment-created-at"),
  isStopped
    ? shouldBeVisible("deployment-destroyed-at")
    : shouldNotExist("deployment-destroyed-at"),
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
  shouldBeVisible("deployment-summary-table"),
];
