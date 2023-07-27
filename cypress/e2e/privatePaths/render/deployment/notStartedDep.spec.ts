import { allDevicesForAppLayout } from "@utils/devices";
import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { runTestsForDevices } from "@utils/index";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  shouldBeVisible,
  shouldFindAndContain,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Expectation } from "@utils/types";

const pageName = "Deployment page for stopped deployment";
const ownerName = "dolthub";
const depName = "us-jails-2";
const currentPage = `/deployments/${ownerName}/${depName}`;

const loggedIn = true;

type Tab = {
  tab: string;
  notStartedMsg?: boolean;
  hasDataCy?: string[];
  notExistDataCy?: string[];
  exp?: Expectation[];
};

const tabs: Tab[] = [
  {
    tab: "Connectivity",
    notStartedMsg: true,
    hasDataCy: [
      "connectivity-field-host",
      "connectivity-field-port",
      "connectivity-field-username",
      "connectivity-field-password",
      "connectivity-field-certificate",
    ],
    notExistDataCy: [
      "instructions-header",
      "clone-header",
      "create-from-backup-button",
      "clone-instructions",
      "disabled-clone-instructions",
    ],
  },
  {
    tab: "Monitoring",
    notStartedMsg: true,
    notExistDataCy: [
      "database-connections",
      "database-queries",
      "query-latency",
      "cpu-usage",
      "memory-usage",
      "disk-usage",
      "disk-io",
      "network-data",
    ],
  },
  {
    tab: "Logs",
    notStartedMsg: true,
    notExistDataCy: [
      "newer-pagination-button",
      "logs",
      "older-pagination-button",
    ],
  },
  { tab: "Backups", hasDataCy: ["backup-table", "backup-options-popup"] },
  {
    tab: "Configuration",
    hasDataCy: ["must-started-msg", "config-table", "configuration-header"],
    notExistDataCy: ["save-changes-button", "must-admin-msg"],
    exp: [
      newExpectationWithScrollIntoView(
        `should scroll to config table`,
        `[data-cy=config-table]`,
        beVisible,
        true,
      ),
      newExpectation(
        "should find no inputs in config table",
        "[data-cy=config-table] input",
        newShouldArgs("be.visible.and.have.length", 0),
      ),
    ],
  },
  {
    tab: "Settings",
    hasDataCy: [
      "service-window-settings",
      "collab-header",
      "collab-table",
      "cypresstesting-collab-row",
      "add-collab-button",
    ],
    notExistDataCy: [
      "edit-service-window-button",
      "advanced-settings",
      "update-advanced-settings-button",
    ],
  },
  {
    tab: "Workbench",
    notStartedMsg: true,
    hasDataCy: ["deployment-workbench"],
    notExistDataCy: [
      "workbench-database-list",
      "database-writes-enabled",
      "writes-not-enabled",
      "enable-writes-form",
      "workbench-auth-directions",
      "workbench-no-databases",
    ],
  },
];

const testTab = (t: Tab, i: number): Expectation[] => {
  // Test current tab
  const tests = [
    shouldFindAndContain(`active-tab-${t.tab.toLowerCase()}`, t.tab),
    t.notStartedMsg
      ? shouldFindAndContain(
          "deployment-not-started-msg",
          `${t.tab} information will be populated as soon as the deployment has started.`,
        )
      : shouldNotExist("deployment-not-started"),
  ];

  if (t.hasDataCy) {
    tests.concat(t.hasDataCy.map(dataCy => shouldBeVisible(dataCy)));
  }
  if (t.notExistDataCy) {
    tests.concat(t.notExistDataCy.map(dataCy => shouldNotExist(dataCy)));
  }
  if (t.exp) {
    tests.concat(t.exp);
  }

  // If not last tab, click on next tab
  if (i < tabs.length - 1) {
    const nextTab = tabs[i + 1];
    const lowerTab = nextTab.tab.toLowerCase();
    return [
      ...tests,
      newExpectationWithScrollIntoView(
        `should scroll to ${nextTab.tab}`,
        `[data-cy=tab-${lowerTab}]`,
        beVisible,
        true,
      ),
      newExpectationWithClickFlows(
        `should click ${nextTab.tab}`,
        `[data-cy=tab-${lowerTab}]`,
        beVisible,
        [newClickFlow(`[data-cy=tab-${lowerTab}]`, [])],
      ),
    ];
  }

  return tests;
};

describe(pageName, () => {
  const tests = [
    ...deploymentHeaderTests(ownerName, depName, true),
    ...tabs.map(testTab).flat(),
  ];
  const devices = allDevicesForAppLayout(pageName, tests, tests, false, true);
  runTestsForDevices({ currentPage, devices, loggedIn });
});
