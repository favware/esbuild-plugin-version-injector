import { defineConfig, Options } from 'tsup';
import { esbuildPluginVersionInjector } from './src';

const baseOptions: Options = {
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  minify: false,
  skipNodeModulesBundle: true,
  sourcemap: true,
  target: 'es2021',
  tsconfig: 'src/tsconfig.json',
  keepNames: true,
  treeshake: true,
  esbuildPlugins: [
    esbuildPluginVersionInjector({
      injectTag: '[InternalVi]{{internal-inject}}[/InternalVi]'
    })
  ]
};

export default [
  defineConfig({
    ...baseOptions,
    outDir: 'dist/cjs',
    format: 'cjs',
    outExtension: () => ({ js: '.cjs' })
  }),
  defineConfig({
    ...baseOptions,
    outDir: 'dist/esm',
    format: 'esm',
    outExtension: () => ({ js: '.mjs' })
  })
];
