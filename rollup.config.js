import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const input = ['src/index.js'];

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
    ],
    output: {
      file: `lib/${pkg.name}.min.js`,
      format: 'umd',
      name: 'commlandMobile', // this is the name of the global object
      esModule: false,
      exports: 'named',
      sourcemap: true,
    },
    external: [
      '@capacitor/core',
      '@capacitor/browser',
      '@capacitor/geolocation',
    ],
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
