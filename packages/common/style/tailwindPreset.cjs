const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	theme: {
		fontFamily: {
			sans: ['Roboto', ...defaultTheme.fontFamily.sans],
			title: ['Lexend Tera', 'Roboto', ...defaultTheme.fontFamily.sans]
		}
	}
};
