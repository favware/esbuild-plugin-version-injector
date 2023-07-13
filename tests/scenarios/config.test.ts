import { Result } from '@sapphire/result';
import tsup, { type Options } from 'tsup';
import type { PluginOptions } from '../../dist';
import { assertFileContent, buildAbsolutePath, createTsupConfig } from '../common/util';

function createConfig(pluginOptions?: PluginOptions): Options {
  return createTsupConfig(
    {
      format: ['esm'],
      entry: [buildAbsolutePath('../fixtures/build-in/typescript.mts')]
    },
    pluginOptions
  );
}

describe('Config', () => {
  beforeAll(() => {
    vi.spyOn(global.console, 'warn').mockImplementation(() => undefined);
  });

  afterAll(() => {
    vi.resetAllMocks();
  });

  test('GIVEN incorrect filter THEN warns and uses all filter', async () => {
    const config = createConfig({
      // @ts-ignore testing incorrect config
      filter: 42
    });

    await tsup.build(config);

    await assertFileContent('../fixtures/build-out/tsup/typescript.mjs');
    expect(console.warn).toHaveBeenCalledOnce();
  });

  test('GIVEN disableOnLoadTrigger=true THEN does not run onLoad hook', async () => {
    const config = createConfig({
      disableOnLoadTrigger: true
    });

    const spy = vi.spyOn(Result, 'fromAsync');

    await tsup.build(config);

    // Result.fromAsync is called in `getVersionOrCurrentDate` and `handleOnLoad`. If it's called only once, then
    // `handleOnLoad` is not called.
    expect(spy).toHaveBeenCalledTimes(1);

    await assertFileContent('../fixtures/build-out/tsup/typescript.mjs');
  });
});
