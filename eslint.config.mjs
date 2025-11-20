import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
// plugin Prettier
import prettierPlugin from "eslint-plugin-prettier";

const eslintConfig = defineConfig([
  // mantém o core-web-vitals do Next
  ...nextVitals,

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/components/ui/**",

  ]),

  // Nosso bloco de regras adicionais / plugins
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Prettier como regra do ESLint (vai reportar formatação)
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          singleQuote: false,
          trailingComma: "all",
          printWidth: 100,
          endOfLine: "auto"
        }
      ],

      // pequenos ajustes úteis (opcionais)
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
    settings: {
      react: { version: "detect" },
    },
  },

  // opcional: adicionar config do eslint-config-prettier no final
  // para garantir que regras conflitantes sejam desativadas.
  // eslint-config-prettier não exporta um plugin, então usamos sua 
  // funcionalidade através do pacote instalado e sem import neste arquivo.
]);

export default eslintConfig;
