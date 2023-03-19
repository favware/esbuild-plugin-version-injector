<div align="center">

# esbuild-plugin-version-injector

**An esbuild plugin to inject your application's version number or today's date
into your files**

[![GitHub](https://img.shields.io/github/license/favware/esbuild-plugin-version-injector)](https://github.com/favware/esbuild-plugin-version-injector/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/esbuild-plugin-version-injector?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/esbuild-plugin-version-injector)

</div>

_This plugin was inspired by
[rollup-plugin-version-injector](https://github.com/djhouseknecht/rollup-plugin-version-injector)_

**Table of Contents**

- [esbuild-plugin-version-injector](#esbuild-plugin-version-injector)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
    - [With `esbuild`](#with-esbuild)
    - [With `tsup`](#with-tsup)
  - [File Injection examples](#file-injection-examples)
    - [JavaScript / TypeScript](#javascript--typescript)
    - [JSON](#json)
    - [CSS](#css)
    - [Text](#text)
  - [Options](#options)
  - [Buy us some doughnuts](#buy-us-some-doughnuts)
  - [Contributors](#contributors)

## Description

There are many ways to export a constant that holds your package variable, from
loading your own package.json through a `fs.readFile`, importing the
package.json directly, or manually updating a constant on every bump. However
all of these have their downsides, and this plugin aims to solve that.

- `fs.readFile` is an addition file operation that the end-user's system has to
  deal with and causes slow downs.
- importing the package.json directly can cause issues with interoperability
  between CJS and ESM as the latter requires JSON assertions.
  - Alternatively when using a bundler that inlines the package.json code that
    means the bundle ends up increasing in size unnecessarily for only having to
    include the version field
- Manually updating a constant on every bump is a chore and can be easily
  forgotten.

This plugin aims to solve all of these issues by injecting the version number
and/or today's date directly into your built JavaScript files during the
bundling step provided by esbuild. This plugin can therefore work with many of
the famous bundlers such as esbuild directly, tsup, vite, or other bundlers that
also use esbuild under the hood.

## Installation

You can use the following command to install this package, or replace
`npm install -D` with your package manager of choice.

```sh
npm install -D esbuild-plugin-version-injector
```

## Usage

### With [`esbuild`][esbuild]

Add the plugin to your esbuild options, i.e.:

```js
const esbuild = require('esbuild');
const { resolve } = require('path');
const {
  esbuildPluginVersionInjector
} = require('esbuild-plugin-version-injector');

await esbuild.build({
  format: 'cjs',
  entryPoints: [resolve(__dirname, './src/index.ts')],
  outdir: resolve(__dirname, './dist'),
  plugins: [esbuildPluginVersionInjector()]
});
```

### With [`tsup`][tsup]

Add the plugin to your `tsup.config.ts`, i.e.:

```js
import { defineConfig } from 'tsup';
import { resolve } from 'path';
import { esbuildPluginVersionInjector } from 'esbuild-plugin-version-injector';

await defineConfig({
  format: ['cjs'],
  entry: ['./src/index.ts'],
  outDir: './dist',
  esbuildPlugins: [esbuildPluginVersionInjector()]
});
```

[esbuild]: https://esbuild.github.io/
[tsup]: https://tsup.egoist.dev

## File Injection examples

### JavaScript / TypeScript

```ts
/**
 * The current version that you are currently using.
 *
 * Note to developers: This needs to explicitly be `string` so it is not typed as a "const string" that gets injected by esbuild
 */
// eslint-disable-next-line @typescript-eslint/no-inferrable-types
export const version: string = '[VI]{{inject}}[/VI]';
```

### JSON

```json
{
  "version": "[VI]{{inject}}[/VI]"
}
```

### CSS

```css
.myClass {
  content: '[VI]{{inject}}[/VI]';
}
```

### Text

```txt
This document is for version [VI]{{inject}}[/VI]
```

## Options

The plugin accepts the following options:

- `versionOrCurrentDate`: One of `'version'`, `'current-date'` or one of the
  entries of the `VersionOrCurrentDate` enum. Defaults to `'version'`. This
  determines what format to inject into your built files. If this is set to
  `current-date` then the current date in the
  [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) will be inserted instead of
  the package.json version.

- `injectTag`: The tag that should be searched for and replaced across your
  code. Defaults to `'[VI]{{inject}}[/VI]'`. This can be any string, but it is
  recommended to use something that is unlikely to be used in your code.

- `packageJsonPath` The relative path to your package.json file. Defaults to
  `'./package.json'`. This is used to read the version number from your
  package.json file.

- `filter`: This is an advanced use-case option with which you can filter which
  files esbuild should apply this plugin on

- `namespace`: This is an advanced use-case option through which the
  [esbuild namespace](https://esbuild.github.io/plugins/#namespaces) can be
  configured

## Buy us some doughnuts

Favware projects are and always will be open source, even if we don't get
donations. That being said, we know there are amazing people who may still want
to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Ko-fi, Paypal, Patreon, GitHub Sponsorships, and
various cryptocurrencies. You can use the buttons below to donate through your
method of choice.

|   Donate With   |                      Address                      |
| :-------------: | :-----------------------------------------------: |
|      Ko-fi      |  [Click Here](https://donate.favware.tech/kofi)   |
|     Patreon     | [Click Here](https://donate.favware.tech/patreon) |
|     PayPal      | [Click Here](https://donate.favware.tech/paypal)  |
| GitHub Sponsors |  [Click Here](https://github.com/sponsors/Favna)  |
|     Bitcoin     |       `1E643TNif2MTh75rugepmXuq35Tck4TnE5`        |
|    Ethereum     |   `0xF653F666903cd8739030D2721bF01095896F5D6E`    |
|    LiteCoin     |       `LZHvBkaJqKJRa8N7Dyu41Jd1PDBAofCik6`        |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a
pull request.

Thank you to all the people who already contributed!

<a href="https://github.com/favware/esbuild-plugin-version-injector/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=favware/esbuild-plugin-version-injector" />
</a>

[contributing]: .github/CONTRIBUTING.md
