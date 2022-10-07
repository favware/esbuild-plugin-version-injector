<div align="center">

# esbuild-plugin-version-injector

**An esbuild plugin to inject your application's version number and/or today's
date into your built JavaScript files**

[![GitHub](https://img.shields.io/github/license/favware/esbuild-plugin-version-injector)](https://github.com/favware/esbuild-plugin-version-injector/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/esbuild-plugin-version-injector?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/esbuild-plugin-version-injector)

</div>

_This plugin was inspired by
[rollup-plugin-version-injector](https://github.com/djhouseknecht/rollup-plugin-version-injector)_

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

TODO

### With [`tsup`][tsup]

TODO

[esbuild]: https://esbuild.github.io/
[tsup]: https://tsup.egoist.dev

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

## Contributors ✨

Thanks goes to these wonderful people
([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the
[all-contributors](https://github.com/all-contributors/all-contributors)
specification. Contributions of any kind welcome!
