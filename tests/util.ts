import { Result } from '@sapphire/result';
import type { BuildOptions } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { esbuildPluginVersionInjector, type PluginOptions } from '../dist/index.js';
import packageJson from '../package.json';

export const actualVersion = packageJson.version;

export function createEsbuildConfig(buildOptions: BuildOptions, pluginOptions?: PluginOptions): BuildOptions {
  return {
    ...buildOptions,
    outdir: buildAbsolutePath('./build-out/esbuild'),
    bundle: true,
    platform: 'node',
    plugins: [esbuildPluginVersionInjector(pluginOptions)]
  };
}

export async function assertFileContent(filePath: string, expectedFileContent: string) {
  const result = await Result.fromAsync(readFile(buildAbsolutePath(filePath), { encoding: `utf-8` }));

  expect(result.isOk()).toBe(true);

  const fileContent = result.unwrap();

  expect(fileContent).toEqual(expectedFileContent);
}

export function buildAbsolutePath(filePath: string) {
  return resolve(__dirname, filePath);
}
