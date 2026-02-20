import "dotenv/config";

import {
  eslintPresetJS,
  esLintConfigAngular,
  tsExtensionsGlob,
  markdownExtensionsGlob,
} from "@impactor/eslint-config";

const strict =
  (process.env.ESLINT_STRICT && process.env.ESLINT_STRICT !== "false") || false;

export default [
  ...eslintPresetJS({
    root: import.meta.dirname,
    strict,
  }),
  ...esLintConfigAngular({
    strict,
  }),
  {
    ignores: [
      "**/nest-swagger-metadata.ts",
      // as it is commonjs format, it will report `'module' is not defined`
      ".ncurc.js",
      "**/*.css",
      "**/*.scss",
      // changelog files are generated automatically by release tools
      "**/CHANGELOG.{md,mdx}",
    ],
  },
  {
    files: [`**/*.${tsExtensionsGlob}`],
    rules: {
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-unsafe-function-type": "warn",
      "@angular-eslint/prefer-inject": "warn",
      "regexp/no-unused-capturing-group": "warn",
    },
  },
  {
    files: [`**/*.${markdownExtensionsGlob}`],
    rules: {
      "markdown/fenced-code-language": "warn",
    },
  },
];
