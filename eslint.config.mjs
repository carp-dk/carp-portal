// @ts-check
import eslintJs from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";

export default tseslint.config(
  {
    ignores: [
      "node_modules/",
      "non_npm_dependencies/",
      "dist/",
      "vite.config.ts",
    ],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],

    // Extend recommended rule sets from:
    // 1. ESLint JS's recommended rules
    // 2. TypeScript ESLint recommended rules
    // 3. ESLint React's recommended-typescript rules
    extends: [
      eslintJs.configs.recommended,
      tseslint.configs.recommended,
      eslintReact.configs["recommended-typescript"],
      stylistic.configs.customize({
        semi: true,
        braceStyle: "1tbs",
        arrowParens: true,
      }),
    ],

    plugins: {
      "@stilistic": stylistic,
    },

    // Configure language/parsing options
    languageOptions: {
      // Use TypeScript ESLint parser for TypeScript files
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        project: "./tsconfig.eslint.json",
      },
    },

    // Custom rule overrides (modify rule levels or disable rules)
    rules: {
      "@eslint-react/no-missing-key": "error",
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/multiline-ternary": ["error", "always"],
    },
  },
);
