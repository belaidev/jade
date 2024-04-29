/** @type {import('eslint').Linter.Config} */
module.exports = {
	/* || Global settings */

	root: true,
	env: { es2024: true },
	parserOptions: {
		sourceType: "module",
		ecmaVersion: "latest",
		ecmaFeatures: { impliedStrict: true }
	},
	extends: [
		"eslint:recommended",
		"plugin:promise/recommended",
		"plugin:tailwindcss/recommended",
		"plugin:prettier/recommended"
	],
	ignorePatterns: ["/build/", "/auto-imports.d.ts"],

	overrides: [
		/* || Node settings */

		{
			env: { node: true },
			extends: ["plugin:n/recommended"],
			files: [
				"*.{js,cjs,ts}",
				"src/routes/**/*.{ts,tsx}",
				"src/**/.server/**/*.{ts,tsx}",
				"src/**/*.server.{ts,tsx}"
			],
			rules: { "n/no-missing-import": "off" }
		},

		/* || Browser settings */

		{
			env: { browser: true },
			files: [
				"src/routes/**/*.{ts,tsx}",
				"src/**/.client/**/*.{ts,tsx}",
				"src/**/*.client.{ts,tsx}"
			]
		},

		/* || React settings */

		{
			parserOptions: { ecmaFeatures: { jsx: true } },
			extends: [
				"plugin:react/recommended",
				"plugin:react/jsx-runtime",
				"plugin:react-hooks/recommended",
				"plugin:jsx-a11y/recommended"
			],
			files: ["src/**/*.{ts,tsx}"],
			settings: {
				react: { version: "detect" },
				formComponents: ["Form"],
				linkComponents: [
					{ name: "Link", linkAttribute: "to" },
					{ name: "NavLink", linkAttribute: "to" }
				]
			},
			rules: { "react/jsx-no-undef": "off" }
		},

		/* ||	TypeScript settings */

		{
			parser: "@typescript-eslint/parser",
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:import/recommended",
				"plugin:import/typescript"
			],
			files: ["**/*.{ts,tsx}"],
			settings: { "import/resolver": { typescript: {} } }
		}
	]
};
