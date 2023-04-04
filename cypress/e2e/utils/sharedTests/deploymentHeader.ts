import { newClickFlow, newExpectationWithClickFlows } from "@utils/helpers";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldFindButton,
  shouldNotExist,
} from "./sharedFunctionsAndVariables";

const actionsClickFlow = (isStopped = false) =>
  newClickFlow(
    "[data-cy=actions-button]",
    [
      shouldFindButton("update-dolt-button", isStopped),
      shouldBeVisible("create-new-dep-button"),
      shouldFindButton("destroy-button", isStopped),
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
