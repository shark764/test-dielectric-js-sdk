import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

const input = ['src/index.js'];
const pkgName = pkg.name.split('/')[1];

export default [
  {
    // UMD
    input,
    plugins: [
      nodeResolve(),
      babel({
        babelHelpers: 'bundled',
      }),
      terser(),
      commonjs({
        include: 'node_modules/**',
        exclude: '**/*.css',
      }),
    ],
    output: {
      file: `lib/${pkgName}.min.js`,
      format: 'umd',
      name: 'commlandMobile', // this is the name of the global object
      esModule: false,
      exports: 'named',
      sourcemap: true,
      inlineDynamicImports: true,
      // globals: {
      //   '@capacitor/core': '@capacitor/core',
      //   '@capacitor/browser': '@capacitor/browser',
      //   '@capacitor/gps': '@capacitor/gps',
      // },
    },
    // external: [
    //   '@capacitor/core',
    //   '@capacitor/browser',
    //   '@capacitor/geolocation',
    // ],
  },
  // ESM and CJS
  {
    input,
    plugins: [nodeResolve()],
    output: [
      {
        dir: 'lib/esm',
        format: 'esm',
        exports: 'named',
        sourcemap: true,
      },
      {
        dir: 'lib/cjs',
        format: 'cjs',
        exports: 'named',
        sourcemap: true,
      },
    ],
  },
];
