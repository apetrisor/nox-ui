// const cssnano = require('cssnano');
const presetEnv = require('postcss-preset-env')({
	features: {
		// enable nesting
		'nesting-rules': true,
	},
});

module.exports = {
	plugins: [
		presetEnv,
		// TODO - cssnano is not currently compatible with PostCSS8, wait till they update it
		// !dev && cssnano,
	],
};
