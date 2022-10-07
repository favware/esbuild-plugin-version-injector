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

describe('Incorrect Config', () => {
  test('GIVEN incorrect filter THEN warns and uses all filter', async () => {
    const warnMock = vi.fn().mockImplementation((text) => text);
    const originalWarn = console.warn;

    console.warn = warnMock;

    const config = createConfig({
      // @ts-ignore testing incorrect config
      filter: 42
    });

    await tsup.build(config);

    await assertFileContent('../fixtures/build-out/tsup/typescript.mjs');
    expect(warnMock).toHaveBeenCalledOnce();

    console.warn = originalWarn;
  });
});
