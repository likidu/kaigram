import typescript from 'rollup-plugin-typescript';
import replace from 'rollup-plugin-replace';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';
import copy from 'rollup-plugin-copy-assets';
import serve from 'rollup-plugin-serve';

export default {
  input: 'src/app.tsx',
  output: {
    format: 'iife',
    file: 'dist/app.js',
  },
  plugins: [
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    // babel({
    //   exclude: [
    //     'node_modules/!(' +
    //     'preact|preact-compat|react-redux' +
    //     ')/**',
    //   ]
    // }),
    nodeResolve({
      jsnext: true,
      // module: false,
      // browser: true,
      main: true,
      extensions: ['.js', '.jsx'],
      // preferBuiltins: true,
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/preact/dist/preact.js': ['h', 'render', 'Component', 'cloneElement', 'options'],
      },
    }),
    // uglify({
    //   compress: {
    //     screw_ie8: true,
    //     warnings: false
    //   },
    //   output: {
    //     comments: false
    //   },
    //   sourcemap: false,
    // }),
    copy({
      assets: [
        './src/index.html'
      ]
    }),
    serve({
      contentBase: 'dist',
      port: 8000
    })
  ],
};