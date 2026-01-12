import { defineConfig } from 'eslint/config';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import react from 'eslint-plugin-react';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all
});

export default defineConfig([{
	extends: compat.extends(
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
	),

	plugins: {
		'@typescript-eslint': typescriptEslint,
		react,
	},

	languageOptions: {
		globals: {
			...globals.browser,
		},

		parser: tsParser,
		ecmaVersion: 'latest',
		sourceType: 'module',
	},

	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],

		'max-lines': ['error', {
			max: 200,
			skipBlankLines: true,
			skipComments: true,
		}],

		'no-cond-assign': 1,
		'no-const-assign': 'error',
		'no-duplicate-imports': 'error',
		'no-fallthrough': 'error',
		'no-irregular-whitespace': 'error',
	},
}]);