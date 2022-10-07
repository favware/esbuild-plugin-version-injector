import esbuild, { type BuildOptions } from 'esbuild';
import type { PluginOptions } from '../../../dist';
import { assertFileContent, buildAbsolutePath, createEsbuildConfig } from '../../common/util';

function createConfig(pluginOptions?: PluginOptions): BuildOptions {
  return createEsbuildConfig(
    {
      format: 'esm',
      outExtension: {
        '.js': '.mjs'
      },
      entryPoints: [buildAbsolutePath('../fixtures/build-in/javascript.mjs')]
    },
    pluginOptions
  );
}

describe('JS based ESM', () => {
  test('GIVEN no plugin options THEN injects version', async () => {
    const config = createConfig();

    await esbuild.build(config);

    await assertFileContent('../fixtures/build-out/esbuild/javascript.mjs');
  });

  test('GIVEN versionOrCurrentDate = "current-date" THEN injects current date', async () => {
    const config = createConfig({
      versionOrCurrentDate: 'current-date'
    });

    await esbuild.build(config);

    await assertFileContent('../fixtures/build-out/esbuild/javascript.mjs');
  });
});
