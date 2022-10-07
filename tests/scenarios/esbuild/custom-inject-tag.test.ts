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
      entryPoints: [buildAbsolutePath('../fixtures/build-in/custom-inject-tag.mts')]
    },
    pluginOptions
  );
}

describe('Custom Version Inject Tag', () => {
  test('GIVEN custom tag THEN injects version', async () => {
    const config = createConfig({
      injectTag: '[VersionInject][/VersionInject]'
    });

    await esbuild.build(config);

    await assertFileContent('../fixtures/build-out/esbuild/custom-inject-tag.mjs');
  });
});
