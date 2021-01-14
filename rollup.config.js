import svelte from 'rollup-plugin-svelte'
import css from 'rollup-plugin-css-only'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import sveltePreprocess from 'svelte-preprocess'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'

const production = !process.env.ROLLUP_WATCH

export default {
    input: 'src/index.ts',
    output: {
        sourcemap: !production,
        format: 'iife',
        name: 'app',
        file: 'dist/bundle.js',
    },
    plugins: [
        del({ targets: 'dist/*', runOnce: true }),

        svelte({
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production
            },
            preprocess: sveltePreprocess(),
        }),

        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        copy({
            targets: [
                { src: ['tdweb/dist/**/*', '!**/tdweb.js'], dest: 'dist' },
                { src: ['public/*'], dest: 'dist' },
                {
                    src: ['public/assets/icons/*'],
                    dest: 'dist/assets/icons',
                },
            ],
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production &&
            serve({
                contentBase: 'dist',
                port: 5000,
            }),

        // Watch the `dist` directory and refresh the
        // browser on changes when not in production
        !production && livereload('dist'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
}
