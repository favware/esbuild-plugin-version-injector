import tsup, { type Options } from 'tsup';
import type { PluginOptions } from '../../../dist';
import { assertFileContent, buildAbsolutePath, createTsupConfig } from '../../common/util';

function createConfig(pluginOptions?: PluginOptions): Options {
  return createTsupConfig(
    {
      format: ['esm'],
      entry: [buildAbsolutePath('../fixtures/build-in/typescript.mts')]
    },
    pluginOptions
  );
}

describe('TS based ESM', () => {
  test('GIVEN no plugin options THEN injects version', async () => {
    const config = createConfig();

    await tsup.build(config);

    await assertFileContent('../fixtures/build-out/tsup/typescript.mjs');
  });

  test('GIVEN versionOrCurrentDate = "current-date" THEN injects current date', async () => {
    const config = createConfig({
      versionOrCurrentDate: 'current-date'
    });

    await tsup.build(config);

    await assertFileContent('../fixtures/build-out/tsup/typescript.mjs');
  });
});
