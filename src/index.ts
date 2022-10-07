import { Result } from '@sapphire/result';
import type { OnLoadArgs, OnLoadOptions, OnLoadResult, Plugin } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export enum VersionOrCurrentDate {
  Version = 'version',
  CurrentDate = 'current-date'
}

export interface PluginOptions {
  /**
   * The [esbuild filter](https://esbuild.github.io/plugins/#filters) to
   * apply for the filtering of files to parse with this plugin
   *
   * @default /.*​/
   */
  filter?: OnLoadOptions['filter'];
  /**
   * The [esbuild namespace](https://esbuild.github.io/plugins/#namespaces) to
   * which the plugin should apply
   *
   * @default undefined
   */
  namespace?: OnLoadOptions['namespace'];
  /**
   * Whether the plugin should inject the package.json version or the
   * current date (in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format)
   *
   * @default 'version'
   */
  versionOrCurrentDate?: 'version' | 'current-date' | VersionOrCurrentDate;
  /**
   * The default identifier that should be searched within the code and replaced with either the
   * the version or the current date as configured by {@link PluginOptions.versionOrCurrentDate}.
   *
   * @default '[VI]{{inject}}[/VI]'
   */
  injectTag?: string;
  /**
   * relative path to project's package.json
   * @default './package.json'
   */
  packageJsonPath?: string;
}

function getFilter(options: PluginOptions): RegExp {
  if (!options.filter) {
    return /.*/;
  }

  if (Object.prototype.toString.call(options.filter) !== '[object RegExp]') {
    console.warn(
      `Plugin "esbuild-plugin-version-injector": Options.filter must be a RegExp object, but gets an '${typeof options.filter}' type. \nThis request will match ANY file!`
    );
    return /.*/;
  }

  return options.filter ?? /.*/;
}

function getInjectTag(options: PluginOptions): string {
  return options.injectTag ?? '[VI]{{inject}}[/VI]';
}

async function getVersionOrCurrentDate(options: PluginOptions): Promise<string | null> {
  const { versionOrCurrentDate } = options;

  if (versionOrCurrentDate === VersionOrCurrentDate.CurrentDate) {
    return new Date().toISOString();
  }

  const packageFile = await Result.fromAsync(readFile(resolve(options.packageJsonPath ?? './package.json'), { encoding: 'utf-8' }));

  if (packageFile.isErr()) {
    return null;
  }

  const packageJson = Result.from<IMinimalPackageJson>(JSON.parse(packageFile.unwrap()));

  if (packageJson.isErr()) {
    return null;
  }

  const packageJsonVersion = packageJson.unwrap().version;

  if (!packageJsonVersion) {
    return null;
  }

  return packageJsonVersion;
}

async function handleOnLoad(args: OnLoadArgs, options: PluginOptions): Promise<OnLoadResult> {
  const injectTag = getInjectTag(options);

  const fileResult = await Result.fromAsync(readFile(args.path, { encoding: 'utf-8' }));

  if (fileResult.isOk()) {
    let unwrappedFileContents = fileResult.unwrap();
    const hasInjectTag = unwrappedFileContents.includes(injectTag);

    if (hasInjectTag) {
      const versionOrCurrentDate = await getVersionOrCurrentDate(options);

      if (versionOrCurrentDate) {
        unwrappedFileContents = unwrappedFileContents.replaceAll(injectTag, versionOrCurrentDate);
      }
    }

    return {
      contents: unwrappedFileContents
    };
  }

  return {};
}

export const esbuildPluginVersionInjector = (
  options: PluginOptions = {
    filter: /.*/,
    versionOrCurrentDate: VersionOrCurrentDate.Version,
    injectTag: '[VI]{{inject}}[/VI]',
    packageJsonPath: './package.json'
  }
): Plugin => {
  const filter = getFilter(options);
  const { namespace } = options;

  return {
    name: 'esbuild-plugin-version-injector',
    setup(build) {
      build.onLoad({ filter, namespace }, (args) => handleOnLoad(args, options));
    }
  };
};

interface IMinimalPackageJson {
  version: string;
  name: string;
  description?: string;
}
