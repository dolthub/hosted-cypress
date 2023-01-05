import {
  newClickFlow,
  newExpectation,
  newExpectationWithClickFlows,
  newExpectationWithScrollIntoView,
  newShouldArgs,
} from "../helpers";
import { ClickFlow, Expectation, ShouldArgs, Tests } from "../types";

const beVisible = newShouldArgs("be.visible");
const notExist = newShouldArgs("not.exist");

export const clickToOpenNavClickFlow: ClickFlow = newClickFlow(
  "[data-cy=left-nav-toggle-icon]",
  [
    newExpectation(
      "the Tables tab should be active",
      `[data-cy=active-tab-tables]`,
      beVisible,
    ),
  ],
);

export const checkViewsClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-views]`,
  [
    newExpectation(
      "the Tables tab should be inactive",
      `[data-cy=tab-tables]`,
      beVisible,
    ),
    newExpectation(
      "the Views tab should be active",
      `[data-cy=active-tab-views]`,
      beVisible,
    ),
  ],
);

export const checkQueriesClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-queries]`,
  [
    newExpectation(
      "the Views tab should be inactive",
      `[data-cy=tab-views]`,
      beVisible,
    ),
    newExpectation(
      "the Queries tab should be active",
      `[data-cy=active-tab-queries]`,
      beVisible,
    ),
  ],
);

export const checkSchemaClickflow: ClickFlow = newClickFlow(
  `[data-cy=tab-schemas]`,
  [
    newExpectation(
      "the Queries tab should be inactive",
      `[data-cy=tab-queries]`,
      beVisible,
    ),
    newExpectation(
      "the Schemas tab should be active",
      `[data-cy=active-tab-schemas]`,
      beVisible,
    ),
  ],
  `[data-cy=tab-tables]`,
);

// TABLES

const testTableEditClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(`[data-cy=db-tables-table-${testTable}-edit]`, [
    newExpectation(
      "",
      `[data-cy=db-tables-table-editing]`,
      newShouldArgs("be.visible.and.contain", "Editing"),
    ),
  ]);

export const conditionalEditButtonTest = (
  loggedIn: boolean,
  testTable: string,
) => {
  const editExpectation: Expectation = loggedIn
    ? newExpectationWithClickFlows(
        "should have an Edit button",
        `[data-cy=db-tables-table-${testTable}-edit]`,
        beVisible,
        [testTableEditClickFlow(testTable)],
      )
    : newExpectation(
        "should not have an Edit button",
        `[data-cy=db-tables-table-${testTable}-edit]`,
        notExist,
      );

  return editExpectation;
};

const testTablePlayClickFlow = (testTable: string): ClickFlow =>
  newClickFlow(
    `[data-cy=db-tables-table-${testTable}-play]`,
    [
      newExpectation(
        "should show a list of columns",
        `[data-cy=db-tables-table-${testTable}-column-list]`,
        beVisible,
      ),
      newExpectation(
        "should show 'viewing'",
        `[data-cy=db-tables-table-viewing]`,
        newShouldArgs("be.visible.and.contain", "Viewing"),
      ),
    ],
    `[data-cy=db-tables-table-${testTable}]`,
  );

export const conditionalPlayButtonTest = (
  hasDocs: boolean,
  testTable: string,
) => {
  const playExpectation: Tests = hasDocs
    ? [
        newExpectationWithClickFlows(
          `should have test table ${testTable}`,
          `[data-cy=db-tables-table-${testTable}]`,
          beVisible,
          [testTablePlayClickFlow(testTable)],
        ),
      ]
    : [
        newExpectation(
          "should show a list of columns",
          `[data-cy=db-tables-table-${testTable}-column-list]`,
          beVisible,
        ),
        newExpectation(
          "should show 'viewing'",
          `[data-cy=db-tables-table-viewing]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ];

  return playExpectation;
};

export const conditionalViewTableMobileTest = (
  hasDocs: boolean,
  testTable: string,
) => {
  const playExpectation: Tests = hasDocs
    ? [
        newExpectationWithClickFlows(
          `should have test table ${testTable}`,
          `[data-cy=db-tables-table-${testTable}-mobile]`,
          beVisible,
          [
            newClickFlow(
              `[data-cy=db-tables-table-${testTable}-mobile] a`,
              [
                newExpectation(
                  "should show table",
                  `[data-cy=mobile-db-data-table]`,
                  beVisible,
                ),
              ],
              `[data-cy=show-table-nav-button]`,
            ),
          ],
        ),
        newExpectation(
          "should show 'viewing'",
          `[data-cy=db-tables-table-viewing-mobile]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ]
    : [
        newExpectation(
          "should show 'viewing'",
          `[data-cy=db-tables-table-viewing-mobile]`,
          newShouldArgs("be.visible.and.contain", "Viewing"),
        ),
      ];

  return playExpectation;
};

const emptyTablesExpectation: Tests = [
  newExpectation(
    "should show empty tables message",
    "[data-cy=db-tables-empty]",
    beVisible,
  ),
  newExpectationWithScrollIntoView(
    "should have an Add New Table button",
    "[data-cy=db-tables-add-table]",
    beVisible,
    true,
  ),
];

const notEmptyTableExpectations = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable: string,
  isMobile = false,
): Tests =>
  isMobile
    ? [
        newExpectation(
          `should have table list with ${tableLen} items`,
          "[data-cy=db-tables-table-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", tableLen),
        ),

        ...conditionalViewTableMobileTest(hasDocs, testTable),
      ]
    : [
        newExpectation(
          `should have table list with ${tableLen} items`,
          "[data-cy=db-tables-table-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", tableLen),
        ),

        ...conditionalPlayButtonTest(hasDocs, testTable),
        conditionalEditButtonTest(loggedIn, testTable),
        // newExpectationWithScrollIntoView(
        //   "should have an Add New Table button",
        //   "[data-cy=db-tables-add-table]",
        //   beVisible,
        //   true,
        // ),
      ];

//* Use tableExpectations when table is populated (left nav is initially open)
//* Use testTablesSection when table is not populated (left nav is initially closed)

export const tableExpectations = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
  isMobile = false,
): Expectation[] => {
  const expectations =
    tableLen === 0 || !testTable
      ? emptyTablesExpectation
      : notEmptyTableExpectations(
          hasDocs,
          loggedIn,
          tableLen,
          testTable,
          isMobile,
        );

  return isMobile
    ? [
        newExpectationWithClickFlows(
          "should show table nav button",
          "[data-cy=show-table-nav-button]",
          beVisible,
          [newClickFlow("[data-cy=show-table-nav-button]", [])],
        ),
        newExpectation(
          "should have branch selector",
          "[data-cy=branch-selector]",
          beVisible,
        ),
        ...expectations,
      ]
    : [
        newExpectation(
          "should have branch selector",
          "[data-cy=branch-selector]",
          beVisible,
        ),
        ...expectations,
      ];
};

export const testTablesSection = (
  hasDocs: boolean,
  loggedIn: boolean,
  tableLen: number,
  testTable?: string,
): Expectation[] => {
  if (tableLen > 0 && !testTable) {
    throw new Error("Cannot have tableLen > 0 and no testTable");
  }
  return [
    newExpectationWithClickFlows(
      "should open left database navigation",
      "[data-cy=left-nav-toggle-icon]",
      beVisible,
      [
        clickToOpenNavClickFlow,
        checkViewsClickflow,
        checkQueriesClickflow,
        checkSchemaClickflow,
      ],
    ),
    ...tableExpectations(hasDocs, loggedIn, tableLen, testTable),
  ];
};

export const testClickDeleteRow = (
  modalTag: string,
  modalShould: ShouldArgs,
): Expectation[] => {
  const modalName = modalTag.split("-").join(" ");
  return [
    newExpectationWithClickFlows(
      "should click first row dropdown button",
      "[data-cy=desktop-db-data-table-row-0-col-0]",
      beVisible,
      [
        newClickFlow(
          "[data-cy=desktop-row-dropdown-button]:first",
          [],
          "[data-cy=desktop-delete-row-button]",
          true,
        ),
      ],
    ),
    newExpectationWithClickFlows(
      `should show ${modalName}`,
      `[data-cy=${modalTag}]`,
      modalShould,
      [
        newClickFlow("[data-cy=close-modal]", [
          newExpectation(
            `should not have open ${modalName}`,
            `[data-cy=${modalTag}]`,
            notExist,
          ),
        ]),
      ],
    ),
  ];
};

// VIEWS

const testViewClickFlow = (testView: string): ClickFlow =>
  newClickFlow(`[data-cy=db-views-view-${testView}]`, [
    newExpectation(
      "",
      `[data-cy=db-views-view-button-${testView}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `SELECT * FROM \`${testView}\``),
    ),
  ]);

const testViewMobile = (testView: string): Expectation[] => [
  newExpectationWithClickFlows(
    "should click view",
    `[data-cy=db-views-view-${testView}]`,
    beVisible,
    [
      newClickFlow(
        `[data-cy=db-views-view-${testView}]`,
        [
          newExpectation(
            "",
            "[data-cy=mobile-sql-editor-button]",
            newShouldArgs(
              "be.visible.and.contain",
              `SELECT * FROM \`${testView}\``,
            ),
          ),
        ],
        "[data-cy=show-table-nav-button]",
      ),
    ],
  ),
  newExpectation(
    "",
    `[data-cy=db-views-view-button-${testView}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
  newExpectation(
    "",
    "[data-cy=mobile-sql-editor-button]",
    newShouldArgs("be.visible.and.contain", `SELECT * FROM \`${testView}\``),
  ),
];

export const emptyViewsExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=db-no-views]", beVisible)
    : newExpectation("", "[data-cy=db-views-empty]", beVisible);

const notEmptyViewsExpectations = (
  viewsLen: number,
  testView: string,
  isMobile = false,
): Tests =>
  isMobile
    ? [
        newExpectation(
          "",
          "[data-cy=db-views-list] > li",
          newShouldArgs("be.visible.and.have.length", viewsLen),
        ),
        ...testViewMobile(testView),
      ]
    : [
        newExpectation(
          "",
          "[data-cy=db-views-list] > li",
          newShouldArgs("be.visible.and.have.length", viewsLen),
        ),
        newExpectationWithClickFlows(
          "should successfully execute a view",
          `[data-cy=db-views-view-${testView}]`,
          beVisible,
          [testViewClickFlow(testView)],
        ),
      ];

const viewsClickFlow = (
  hasBranch: boolean,
  viewsLen: number,
  testView?: string,
  isMobile = false,
): ClickFlow => {
  const expectations =
    viewsLen === 0 || !testView
      ? [emptyViewsExpectation(hasBranch)]
      : notEmptyViewsExpectations(viewsLen, testView, isMobile);

  return newClickFlow("[data-cy=tab-views]", expectations);
};

export const testViewsSection = (
  hasBranch: boolean,
  viewsLen: number,
  testView?: string,
  isMobile = false,
): Expectation => {
  if (viewsLen > 0 && !testView) {
    throw new Error("Cannot have viewsLen > 0 and no testView");
  }
  return newExpectationWithClickFlows(
    "should have db Views section",
    "[data-cy=tab-views]",
    beVisible,
    [viewsClickFlow(hasBranch, viewsLen, testView, isMobile)],
  );
};

// QUERY CATALOG

const testQueryClickFlow = (testQuery: string): ClickFlow =>
  newClickFlow(`[data-cy=db-query-button-${testQuery}]`, [
    newExpectation(
      "",
      `[data-cy=db-query-viewing-${testQuery}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs("be.visible.and.contain", `select * from ${testQuery}`),
    ),
  ]);

const testQueryMobile = (testQuery: string): Expectation[] => [
  newExpectationWithClickFlows(
    "should successfully execute a query",
    `[data-cy=db-query-list-query-${testQuery}]`,
    beVisible,
    [
      newClickFlow(
        `[data-cy=db-query-button-${testQuery}]`,
        [
          newExpectation(
            "",
            "[data-cy=mobile-sql-editor-button]",
            newShouldArgs(
              "be.visible.and.contain",
              `select * from ${testQuery}`,
            ),
          ),
        ],
        "[data-cy=show-table-nav-button]",
      ),
    ],
  ),
  newExpectation(
    "",
    `[data-cy=db-query-viewing-${testQuery}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
];

export const emptyQueriesExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=db-no-queries]", beVisible)
    : newExpectation("", "[data-cy=db-queries-empty]", beVisible);

const notEmptyQueriesExpectations = (
  queryLen: number,
  testQuery: string,
  isMobile = false,
): Tests =>
  isMobile
    ? [
        newExpectationWithScrollIntoView(
          "should render link to see more queries",
          "[data-cy=db-query-see-all]",
          beVisible,
          true,
        ),
        newExpectation(
          "",
          "[data-cy=db-query-list] > li",
          newShouldArgs("be.visible.and.have.length", queryLen),
        ),
        ...testQueryMobile(testQuery),
      ]
    : [
        newExpectationWithScrollIntoView(
          "should render link to see more queries",
          "[data-cy=db-query-see-all]",
          beVisible,
          true,
        ),
        newExpectation(
          "",
          "[data-cy=db-query-list] > li",
          newShouldArgs("be.visible.and.have.length", queryLen),
        ),
        newExpectationWithClickFlows(
          "should successfully execute a query",
          `[data-cy=db-query-list-query-${testQuery}]`,
          beVisible,
          [testQueryClickFlow(testQuery)],
        ),
      ];

const queryCatalogClickFlow = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
  isMobile = false,
): ClickFlow => {
  const expectations =
    queryLen === 0 || !testQuery
      ? [emptyQueriesExpectation(hasBranch)]
      : notEmptyQueriesExpectations(queryLen, testQuery, isMobile);

  return newClickFlow("[data-cy=tab-queries]", expectations);
};

export const testQueryCatalogSection = (
  hasBranch: boolean,
  queryLen: number,
  testQuery?: string,
  isMobile = false,
): Expectation => {
  if (queryLen > 0 && !testQuery) {
    throw new Error("Cannot have queryLen > 0 and no testQuery");
  }
  return newExpectationWithClickFlows(
    "should have db Query Catalog section",
    "[data-cy=tab-queries]",
    beVisible,
    [queryCatalogClickFlow(hasBranch, queryLen, testQuery, isMobile)],
  );
};

// SCHEMAS

const testSchemaClickFlow = (testSchema: string): ClickFlow =>
  newClickFlow(`[data-cy=db-tables-schema-${testSchema}-play]`, [
    newExpectation(
      "",
      `[data-cy=db-tables-schema-${testSchema}]`,
      newShouldArgs("be.visible.and.contain", "Viewing"),
    ),
    newExpectation(
      "",
      "[data-cy=sql-editor-collapsed]",
      newShouldArgs(
        "be.visible.and.contain",
        `SHOW CREATE TABLE \`${testSchema}\``,
      ),
    ),
  ]);

const testSchemaMobile = (
  schemaLen: number,
  testSchema: string,
): Expectation[] => [
  newExpectation(
    "",
    "[data-cy=db-tables-schema-list] > ol > li",
    newShouldArgs("be.visible.and.have.length", schemaLen),
  ),
  newExpectationWithClickFlows(
    "should successfully execute a schema",
    `[data-cy=db-tables-schema-${testSchema}]`,
    beVisible,
    [
      newClickFlow(
        `[data-cy=db-tables-schema-${testSchema}-play]`,
        [
          newExpectation(
            "",
            "[data-cy=mobile-sql-editor-button]",
            newShouldArgs(
              "be.visible.and.contain",
              `SHOW CREATE TABLE \`${testSchema}\``,
            ),
          ),
        ],
        "[data-cy=show-table-nav-button]",
      ),
    ],
  ),
  newExpectation(
    "",
    `[data-cy=db-tables-schema-${testSchema}]`,
    newShouldArgs("be.visible.and.contain", "Viewing"),
  ),
];

export const emptySchemaExpectation = (hasBranch: boolean): Expectation =>
  hasBranch
    ? newExpectation("", "[data-cy=db-tables-empty]", beVisible)
    : newExpectation("", "[data-cy=db-schemas-empty]", beVisible);

const notEmptySchemaExpectations = (
  schemaLen: number,
  testSchema: string,
  isMobile = false,
): Tests =>
  isMobile
    ? testSchemaMobile(schemaLen, testSchema)
    : [
        newExpectation(
          "",
          "[data-cy=db-tables-schema-list] > ol > li",
          newShouldArgs("be.visible.and.have.length", schemaLen),
        ),
        newExpectationWithClickFlows(
          "should successfully execute a schema",
          `[data-cy=db-tables-schema-${testSchema}]`,
          beVisible,
          [testSchemaClickFlow(testSchema)],
        ),
      ];

const schemaClickFlow = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema?: string,
  isMobile = false,
): ClickFlow => {
  const expectations =
    schemaLen === 0 || !testSchema
      ? [emptySchemaExpectation(hasBranch)]
      : notEmptySchemaExpectations(schemaLen, testSchema, isMobile);

  return newClickFlow(
    "[data-cy=tab-schemas]",
    expectations,
    "[data-cy=tab-tables]",
  );
};

export const testSchemaSection = (
  hasBranch: boolean,
  schemaLen: number,
  testSchema?: string,
  isMobile = false,
): Expectation => {
  if (schemaLen > 0 && !testSchema) {
    throw new Error("Cannot have schemaLen > 0 and no testSchema");
  }
  return newExpectationWithClickFlows(
    "should have db Schema section",
    "[data-cy=tab-schemas]",
    beVisible,
    [schemaClickFlow(hasBranch, schemaLen, testSchema, isMobile)],
    // TODO: unskip when revision database panic is fixed
    true,
  );
};
