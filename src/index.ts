import { Result } from '@sapphire/result';
import type { OnLoadArgs, OnLoadOptions, OnLoadResult, Plugin } from 'esbuild';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

import './StringReplaceAllPolyfill';

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
   * Relative path to project's package.json
   *
   * Note if you set {@link PluginOptions.versionOrCurrentDate} to 'current-date' this option will be ignored.
   *
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

/**
 * Resolves the proper [ESBuild content type loader](https://esbuild.github.io/content-types/) based on
 * the file extension using {@link extname}
 *
 * If no match can be found with the file extension, then the JavaScript content type loader is returned.
 * This matches how ESBuild handles would handle an unspecified loader or unknown file extension.
 *
 * @param args The esbuild {@link OnLoadArgs}
 * @returns The proper content type loader based on the file extension
 */
function getEsbuildLoader(args: OnLoadArgs) {
  const resolvedExtName = extname(args.path);

  switch (resolvedExtName) {
    case '.ts':
    case '.tsx':
    case '.mts':
    case '.cts':
      return 'ts';
    case '.jsx':
      return 'tsx';
    case '.json':
      return 'json';
    case '.css':
      return 'css';
    case '.txt':
      return 'text';
    case '.js':
    case '.cjs':
    case '.mjs':
    default:
      return 'js';
  }
}

async function handleOnLoad(args: OnLoadArgs, options: PluginOptions): Promise<OnLoadResult | undefined> {
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
      pluginData: args.pluginData,
      contents: unwrappedFileContents,
      loader: getEsbuildLoader(args)
    };
  }

  return undefined;
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

/**
 * The [esbuild-plugin-version-injector](https://github.com/favware/esbuild-plugin-version-injector/#readme) version
 * that you are currently using.
 */
export const version = '[InternalVi]{{internal-inject}}[/InternalVi]';

interface IMinimalPackageJson {
  version: string;
  name: string;
  description?: string;
}
