import esbuild, { type BuildOptions } from 'esbuild';
import type { PluginOptions } from '../../dist';
import { actualVersion, assertFileContent, buildAbsolutePath, createEsbuildConfig } from '../util';

function createConfig(pluginOptions?: PluginOptions): BuildOptions {
  return createEsbuildConfig(
    {
      format: 'esm',
      outExtension: {
        '.js': '.mjs'
      },
      entryPoints: [buildAbsolutePath('./build-in/esbuild/esm-ts.ts')]
    },
    pluginOptions
  );
}

describe('TS based ESM', () => {
  test('GIVEN no plugin options THEN injects version', async () => {
    const config = createConfig();

    await esbuild.build(config);

    await assertFileContent(
      './build-out/esbuild/esm-ts.mjs',
      `// tests/build-in/esbuild/esm-ts.ts
var version = "${actualVersion}";
export {
  version
};
`
    );
  });

  test('GIVEN versionOrCurrentDate = "current-date" THEN injects current date', async () => {
    const config = createConfig({
      versionOrCurrentDate: 'current-date'
    });

    await esbuild.build(config);

    await assertFileContent(
      './build-out/esbuild/esm-ts.mjs',
      `// tests/build-in/esbuild/esm-ts.ts
var version = "2022-02-01T14:30:30.000Z";
export {
  version
};
`
    );
  });
});
