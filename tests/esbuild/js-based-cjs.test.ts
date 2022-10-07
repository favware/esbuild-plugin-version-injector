import esbuild, { type BuildOptions } from 'esbuild';
import type { PluginOptions } from '../../dist';
import { assertFileContent, buildAbsolutePath, createEsbuildConfig } from '../util';

function createConfig(pluginOptions?: PluginOptions): BuildOptions {
  return createEsbuildConfig(
    {
      format: 'cjs',
      outExtension: {
        '.js': '.cjs'
      },
      entryPoints: [buildAbsolutePath('./build-in/javascript.cjs')]
    },
    pluginOptions
  );
}

describe('JS based CJS', () => {
  test('GIVEN no plugin options THEN injects version', async () => {
    const config = createConfig();

    await esbuild.build(config);

    await assertFileContent('./build-out/esbuild/javascript.cjs');
  });

  test('GIVEN versionOrCurrentDate = "current-date" THEN injects current date', async () => {
    const config = createConfig({
      versionOrCurrentDate: 'current-date'
    });

    await esbuild.build(config);

    await assertFileContent('./build-out/esbuild/javascript.cjs');
  });
});
