import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';
import sveltePreprocess from 'svelte-preprocess';
import css from 'rollup-plugin-css-only';

const name = pkg.name
	.replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
	.replace(/^\w/, m => m.toUpperCase())
	.replace(/-\w/g, m => m[1].toUpperCase());

const onwarn = (warning, onwarn) => (warning.code === 'PLUGIN_WARNING' && warning.pluginCode === 'a11y-no-onchange') || onwarn(warning);

export default {
	input: 'src/index.js',
	output: [
		{file: pkg.module, format: 'es'},
		{file: pkg.main, format: 'umd', name},
	],
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				preserve: ['ld+json'],
			}),
		}),
		css({output: 'bundle.css'}),
		resolve({
			dedupe: ['svelte'],
		}),
		commonjs(),
	],
	onwarn,
};
