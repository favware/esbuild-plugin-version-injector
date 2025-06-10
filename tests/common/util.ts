import { Result } from '@sapphire/result';
import type { BuildOptions } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { defineConfig, type Options as TsupOptions } from 'tsup';
import { esbuildPluginVersionInjector, type PluginOptions } from '../../dist/esm/index.mjs';
import { esbuildPluginVersionInjector as tsBasedEsbuildPluginVersionInjector } from '../../src/index';

export function createEsbuildConfig(buildOptions: BuildOptions, pluginOptions?: PluginOptions): BuildOptions {
  return {
    ...buildOptions,
    outdir: buildAbsolutePath('../fixtures/build-out/esbuild'),
    bundle: true,
    platform: 'node',
    plugins: [esbuildPluginVersionInjector(pluginOptions)]
  };
}

export function createTsupConfig(tsupOptions: TsupOptions, pluginOptions?: PluginOptions): TsupOptions {
  return defineConfig({
    ...tsupOptions,
    clean: false,
    dts: false,
    minify: false,
    skipNodeModulesBundle: true,
    sourcemap: false,
    target: 'es2021',
    tsconfig: buildAbsolutePath('../fixtures/build-in/tsconfig.json'),
    keepNames: true,
    treeshake: true,
    outDir: buildAbsolutePath('../fixtures/build-out/tsup'),
    bundle: true,
    platform: 'node',
    splitting: false,
    config: false,
    silent: true,
    esbuildPlugins: [tsBasedEsbuildPluginVersionInjector(pluginOptions)],
    outExtension(context) {
      switch (context.format) {
        case 'cjs':
          return { js: '.cjs' };
        case 'esm':
          return { js: '.mjs' };
        default:
          return { js: 'js' };
      }
    }
  }) as TsupOptions;
}

export async function assertFileContent(filePath: string) {
  const result = await Result.fromAsync(readFile(buildAbsolutePath(filePath), { encoding: `utf-8` }));

  expect(result.isOk()).toBe(true);

  const fileContent = result.unwrap();

  expect(fileContent).toMatchSnapshot();
}

export function buildAbsolutePath(filePath: string) {
  return resolve(__dirname, filePath);
}
