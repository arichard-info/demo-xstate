const tailwindPreset = require('common/style/tailwindPreset.cjs');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}', './../common/**/*.{html,js,svelte,ts}'],
	presets: [tailwindPreset]
};
