/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
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
    ignores: [
      "node_modules/*",
      "dist",
      "non_npm_dependencies/*",
    ],
  },
  ...compat.extends("@carp-dk/eslint-config"),
  {
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "module",

      parserOptions: {
        project: "./tsconfig.json",

        ecmaFeatures: {
          jsx: true,
        },

        tsconfigRootDir: __dirname,
      },
    },
  },
];
