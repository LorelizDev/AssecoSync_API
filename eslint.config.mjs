import globals from 'globals';
import pluginReact from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import eslintJs from '@eslint/js';
import * as tseslint from 'typescript-eslint';

export default [
  // Configuración global
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      react: pluginReact,
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Configuración para archivos React y JSX/TSX
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      'react/prop-types': 'off',
    },
  },

  // Configuración de Prettier
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Reglas recomendadas de ESLint
  eslintJs.configs.recommended,

  // Reglas recomendadas de TypeScript
  ...tseslint.configs.recommended,
];
