import typescriptEslint from "@typescript-eslint/eslint-plugin";
import cypress from "eslint-plugin-cypress";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  {
    ignores: ["**/node_modules", "**/dist", "**/cypress.config.ts"],
  },
  ...compat.extends(
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "plugin:cypress/recommended",
  ),
  {
    plugins: {
      "@typescript-eslint": typescriptEslint,
      cypress,
    },

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "./tsconfig.json",
      },
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },

    rules: {
      "@typescript-eslint/array-type": [
        "error",
        {
          default: "array-simple",
        },
      ],

      "@typescript-eslint/await-thenable": "error",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",

      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "default",
          format: ["camelCase"],
          leadingUnderscore: "allow",
        },
        {
          selector: "variable",
          format: ["camelCase", "UPPER_CASE"],
        },
        {
          selector: ["typeLike", "enumMember"],
          format: ["PascalCase"],
        },
        {
          selector: ["objectLiteralProperty"],
          format: null,
        },
      ],

      "@typescript-eslint/no-base-to-string": "error",
      "@typescript-eslint/no-extra-non-null-assertion": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-assertion": "error",

      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/no-use-before-define": [
        "error",
        {
          classes: false,
          functions: false,
        },
      ],

      "@typescript-eslint/prefer-interface": "off",
      "@typescript-eslint/prefer-nullish-coalescing": ["warn"],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/prefer-string-starts-ends-with": "error",
      "@typescript-eslint/promise-function-async": "error",
      "import/prefer-default-export": "off",

      "no-plusplus": [
        "error",
        {
          allowForLoopAfterthoughts: true,
        },
      ],

      "no-sequences": "error",
      "no-underscore-dangle": "off",

      "no-use-before-define": [
        "error",
        {
          classes: false,
          functions: false,
        },
      ],

      "cypress/no-unnecessary-waiting": "warn",
    },
  },
];
