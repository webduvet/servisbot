import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginReact from "eslint-plugin-react"; // Add this


export default [
	{files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
	{languageOptions: { globals: {...globals.browser, ...globals.node} }},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			// Enforce tabs for indentation
			"indent": ["error", "tab"],
			// Ensure no spaces are used for indentation
			"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
			// Optionally, ensure JSX uses the same indentation
			"react/jsx-indent": ["error", "tab"],
			"react/jsx-indent-props": ["error", "tab"],
		},
	},
];
