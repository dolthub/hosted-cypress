import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "@utils/helpers";
import { deploymentHeaderTests } from "@utils/sharedTests/deploymentHeader";
import {
  beVisible,
  beVisibleAndContain,
  notBeVisible,
  notExist,
  shouldBeVisible,
  shouldFindAndCloseModal,
  shouldFindAndContain,
  shouldFindAndScrollTo,
  shouldFindAndScrollToWithText,
  shouldFindButton,
  shouldFindCheckbox,
  shouldNotExist,
} from "@utils/sharedTests/sharedFunctionsAndVariables";
import { Expectation } from "@utils/types";
import { DeploymentConfig } from "./deploymentConfigs";

const supportedOverrides = [
  "behavior_auto_commit",
  "behavior_dolt_transaction_commit",
  "behavior_read_only",
  "behavior_sysvar_persistence",
  "behavior_disable_multistatements",
  "listener_max_connections",
  "listener_read_timeout_millis",
  "listener_write_timeout_millis",
  "max_logged_query_len",
  "log_level",
];

const connectivityFields = (config: DeploymentConfig) => [
  { dataCy: "copyable-field-host", text: "Host" },
  { dataCy: "copyable-field-port", text: "Port" },
  { dataCy: "copyable-field-username", text: "Username" },
  { dataCy: "copyable-field-password", text: "Password" },
  { dataCy: "copyable-field-certificate", text: "Certificate" },
  { dataCy: "connect-instructions", text: config.connectInstructionsText },
  { dataCy: "docs-link", text: "Read the docs" },
];

export const indexTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    isMobile,
    config.hasWorkbench,
  ),
  shouldNotExist("must-admin-msg"),
  shouldNotExist("must-started-msg"),
  shouldFindAndContain("active-tab-database", "Database"),
  shouldBeVisible("deployment-summary"),
  shouldNotExist("deployment-destroyed-at"),
  shouldFindAndScrollTo("deployment-created-at"),
  ...connectivityFields(config).map(({ dataCy, text }) =>
    shouldFindAndScrollToWithText(dataCy, text),
  ),
  ...supportedOverrides.map(shouldFindAndScrollTo),
  ...(config.includesCloneSection
    ? [
        shouldFindAndScrollToWithText("clone-header", "Clone"),
        shouldFindAndScrollToWithText(
          "clone-instructions",
          `You can clone "${config.depName}" using the Dolt CLI* by executing these commands:`,
        ),
      ]
    : []),
  ...(config.includesRemotesapi
    ? [
        shouldFindAndScrollTo("expose-remotesapi-endpoint-checkbox"),
        ...shouldFindCheckbox("expose-remotesapi-endpoint-checkbox", true),
        shouldFindButton("update-advanced-settings-button", true),
      ]
    : []),
];

export const backupsTests = (config: DeploymentConfig): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    false,
    config.hasWorkbench,
  ),
  shouldFindAndContain("active-tab-backups", "Backups"),
  shouldBeVisible("backup-table"),
  newExpectation(
    `should have at least ${config.minBackupCount} backups`,
    "[data-cy=backup-table] > tbody > tr",
    newShouldArgs(
      "be.visible.and.have.length.of.at.least",
      config.minBackupCount,
    ),
  ),
  newExpectation(
    "should have server in each row",
    "[data-cy=backup-table] > tbody > tr > td:nth-child(2)",
    beVisibleAndContain("0"),
  ),
  newExpectation(
    `should have ${config.backupDbName} database in each row`,
    "[data-cy=backup-table] > tbody > tr > td:nth-child(3)",
    beVisibleAndContain(config.backupDbName),
  ),
  newExpectation(
    "should have size in each row",
    "[data-cy=backup-table] > tbody > tr > td:nth-child(4)",
    beVisibleAndContain(config.backupSizeUnit),
  ),
  newExpectation(
    "should have created at in each row",
    "[data-cy=backup-table] > tbody > tr > td:nth-child(5)",
    beVisibleAndContain("ago"),
  ),
  newExpectation(
    "should have options dropdown in each row",
    "[data-cy=backup-table] > tbody > tr [data-cy=backup-options-popup]",
    beVisible,
  ),
];

export const configurationTests = (): Expectation[] => [
  shouldFindAndContain("active-tab-database", "Database"),
  shouldBeVisible("configuration-header"),
  shouldNotExist("must-admin-msg"),
  shouldNotExist("must-started-msg"),
  ...supportedOverrides.map(shouldFindAndScrollTo),
  shouldFindAndScrollTo("edit-config-button"),
  newExpectationWithClickFlows(
    "should click edit config",
    "[data-cy=edit-config-button]",
    beVisible,
    [
      newClickFlow(
        "[data-cy=edit-config-button]",
        [
          newExpectation(
            "should find multiple inputs in config table",
            "[data-cy=config-table] input",
            newShouldArgs(
              "be.visible.and.have.length.of.at.least",
              supportedOverrides.length,
            ),
          ),
          shouldBeVisible("save-changes-button"),
        ],
        "[data-cy=cancel-button]",
      ),
    ],
  ),
  newExpectation(
    "should have no inputs after cancel",
    "[data-cy=config-table] input",
    notExist,
  ),
];

export const connectivityTests = (config: DeploymentConfig): Expectation[] => [
  shouldFindAndContain("active-tab-database", "Database"),
  ...connectivityFields(config).map(({ dataCy, text }) =>
    shouldFindAndScrollToWithText(dataCy, text),
  ),
];

const logDataCys = [
  "newer-pagination-button",
  "logs",
  "older-pagination-button",
];

export const logsTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    isMobile,
    config.hasWorkbench,
  ),
  shouldFindAndContain("active-tab-logs", "Logs"),
  ...logDataCys.map(dataCy =>
    newExpectationWithScrollIntoView(
      `should scroll to ${dataCy}`,
      `[data-cy=${dataCy}]`,
      beVisible,
      true,
      false,
      10000,
    ),
  ),
];

const graphTitles = [
  "database-connections",
  "database-queries",
  "query-latency",
  "cpu-usage",
  "memory-usage",
  "disk-usage",
  "disk-io",
  "network-data",
];

export const monitoringTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    isMobile,
    config.hasWorkbench,
  ),
  shouldFindAndContain("active-tab-monitoring", "Monitoring"),
  ...graphTitles.map(shouldFindAndScrollTo),
];

const swDataCys = [
  "service-window-settings",
  "service-window-day-of-week",
  "service-window-start-time",
  "service-window-end-time",
];

const editServiceWindowClickFlow = newClickFlow(
  "[data-cy=edit-service-window-button]",
  [
    newExpectation(
      "should have service window inputs",
      "[data-cy=service-window-settings] input",
      newShouldArgs("be.visible.and.have.length", 5),
    ),
    shouldBeVisible("save-service-window-button"),
  ],
  "[data-cy=cancel-button]",
);

const collabFormClickFlow = newClickFlow("[data-cy=add-collab-button]", [
  shouldFindAndContain("modal-title", "Add collaborator"),
  shouldBeVisible("add-collab-radios"),
  ...[
    { clickCy: "team-radio", findCy: "add-team-form" },
    { clickCy: "individual-radio", findCy: "add-individual-form" },
  ].map(({ clickCy, findCy }) =>
    newExpectationWithClickFlows(
      `should find ${findCy}`,
      `[data-cy=${clickCy}]`,
      beVisible,
      [newClickFlow(`[data-cy=${clickCy}]`, [shouldBeVisible(findCy)])],
    ),
  ),
]);

export const settingsTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    isMobile,
    config.hasWorkbench,
  ),
  shouldFindAndContain("active-tab-settings", "Settings"),
  shouldFindAndScrollTo("service-window-settings"),
  ...swDataCys.map(dc => shouldBeVisible(dc)),
  newExpectation(
    "should have no service window inputs",
    "[data-cy=service-window-settings] input",
    notBeVisible,
  ),
  newExpectationWithClickFlows(
    "should show edit service window inputs on edit",
    "[data-cy=edit-service-window-button]",
    beVisible,
    [editServiceWindowClickFlow],
  ),
  shouldFindAndScrollTo("collab-header"),
  shouldBeVisible("collab-table"),
  shouldBeVisible("cypresstesting-collab-row"),
  newExpectationWithClickFlows(
    "should open new collaborator modal",
    "[data-cy=add-collab-button]",
    beVisible,
    [collabFormClickFlow],
  ),
  shouldFindAndCloseModal,
  shouldFindAndScrollTo("advanced-settings"),
];

export const workbenchTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => [
  ...deploymentHeaderTests(
    config.ownerName,
    config.depName,
    false,
    isMobile,
    config.hasWorkbench,
  ),
  shouldFindAndContain("active-tab-settings", "Settings"),
  shouldFindAndContain("deployment-workbench", "Workbench"),
  newExpectation(
    "should have list of databases",
    "[data-cy=workbench-database-list] > li",
    newShouldArgs("be.visible.and.have.length.of.at.least", 1),
  ),
  shouldBeVisible("database-writes-enabled"),
  shouldNotExist("writes-not-enabled"),
  shouldBeVisible("enable-writes-form"),
  ...shouldFindCheckbox("writes-enabled-checkbox", true),
  shouldNotExist("workbench-auth-directions"),
  shouldNotExist("workbench-no-databases"),
];

type Tab = {
  tab: string;
  notStartedMsg?: boolean;
  hasDataCy?: string[];
  notExistDataCy?: string[];
  exp?: Expectation[];
};

const buildTabs = (hasWorkbench: boolean): Tab[] => [
  {
    tab: "Database",
    notStartedMsg: true,
    hasDataCy: [
      "connectivity-field-host",
      "connectivity-field-port",
      "connectivity-field-username",
      "connectivity-field-password",
      "connectivity-field-certificate",
      "must-started-msg",
      "config-table",
      "configuration-header",
    ],
    notExistDataCy: [
      "instructions-header",
      "clone-header",
      "create-from-backup-button",
      "clone-instructions",
      "disabled-clone-instructions",
      "save-changes-button",
    ],
    exp: [
      newExpectationWithScrollIntoView(
        "should scroll to config table",
        "[data-cy=config-table]",
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
    tab: "Settings",
    hasDataCy: [
      ...(hasWorkbench ? ["deployment-workbench"] : []),
      "collab-header",
      "collab-table",
      "cypresstesting-collab-row",
      "add-collab-button",
      "service-window-settings",
    ],
    notExistDataCy: [
      ...(!hasWorkbench ? ["deployment-workbench"] : []),
      "workbench-database-list",
      "database-writes-enabled",
      "writes-not-enabled",
      "enable-writes-form",
      "workbench-auth-directions",
      "workbench-no-databases",
      "edit-service-window-button",
      "advanced-settings",
      "update-advanced-settings-button",
    ],
  },
];

const buildTabTest =
  (tabs: Tab[]) =>
  (t: Tab, i: number): Expectation[] => {
    const tests: Expectation[] = [
      shouldFindAndContain(`active-tab-${t.tab.toLowerCase()}`, t.tab),
      t.notStartedMsg
        ? shouldFindAndContain(
            "deployment-not-started-msg",
            `${t.tab} information will be populated as soon as the deployment has started.`,
          )
        : shouldNotExist("deployment-not-started"),
    ];

    if (t.hasDataCy) {
      tests.push(...t.hasDataCy.map(dataCy => shouldBeVisible(dataCy)));
    }
    if (t.notExistDataCy) {
      tests.push(...t.notExistDataCy.map(dataCy => shouldNotExist(dataCy)));
    }
    if (t.exp) {
      tests.push(...t.exp);
    }

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

export const notStartedDepTests = (
  config: DeploymentConfig,
  isMobile = false,
): Expectation[] => {
  const tabs = buildTabs(config.hasWorkbench);
  return [
    ...deploymentHeaderTests(
      config.stoppedDep.ownerName,
      config.stoppedDep.depName,
      true,
      isMobile,
      config.hasWorkbench,
    ),
    ...tabs.map(buildTabTest(tabs)).flat(),
  ];
};
