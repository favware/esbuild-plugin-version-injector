import { defineConfig } from 'tsup';
import { esbuildPluginVersionInjector } from './src';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
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
});
