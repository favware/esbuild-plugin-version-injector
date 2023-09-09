import autoprefixer from 'autoprefixer';
import esbuild, { type BuildOptions } from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import postcss from 'postcss';
import { esbuildPluginVersionInjector } from '../../../dist/index.js';
import { assertFileContent, buildAbsolutePath } from '../../common/util';

const midConfig: BuildOptions = {
  bundle: true,
  outdir: buildAbsolutePath('../fixtures/build-mid/css'),
  entryPoints: [buildAbsolutePath('../fixtures/build-in/styles.scss')],
  plugins: [
    sassPlugin({
      async transform(source) {
        const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
        return css;
      }
    })
  ]
};

const endConfig: BuildOptions = {
  bundle: true,
  outdir: buildAbsolutePath('../fixtures/build-out/css'),
  entryPoints: [buildAbsolutePath('../fixtures/build-mid/css/styles.css')],
  plugins: [esbuildPluginVersionInjector()]
};

describe('SCSS to CSS', () => {
  test('GIVEN no plugin options THEN injects version', async () => {
    await esbuild.build(midConfig);
    await esbuild.build(endConfig);

    await assertFileContent('../fixtures/build-mid/css/styles.css');
    await assertFileContent('../fixtures/build-out/css/styles.css');
  });
});
