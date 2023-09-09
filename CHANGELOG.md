# Changelog

All notable changes to this project will be documented in this file.

# [1.2.1](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.2.0...v1.2.1) - (2023-09-09)

## 🏠 Refactor

- Move exports to the bottom to have them all in 1 place ([4bfe592](https://github.com/favware/esbuild-plugin-version-injector/commit/4bfe5927549bc26ad2cda4d56ec35a440ea60378))

## 🐛 Bug Fixes

- Add missing css preprocessor file extensions to loader ([f87374a](https://github.com/favware/esbuild-plugin-version-injector/commit/f87374a0712931e731ba03f4a098b36a2dc87325))

## 📝 Documentation

- **readme:** Add note about CSS preprocessors ([9843247](https://github.com/favware/esbuild-plugin-version-injector/commit/98432472ffbb309eada6e87e7c987358d5604e9d))

## 🧪 Testing

- Add test to cover scss->css conversion ([ec310fb](https://github.com/favware/esbuild-plugin-version-injector/commit/ec310fb0731470d723e93ce86ebc43a499c70250))

# [1.2.0](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.1.0...v1.2.0) - (2023-07-13)

## 🐛 Bug Fixes

- **deps:** Update all non-major dependencies ([b05c2ef](https://github.com/favware/esbuild-plugin-version-injector/commit/b05c2effc214a4ae4208455807575688f96ca446))

## 🚀 Features

- Introduce `disableOnLoadTrigger` option (#65) ([9ce2e90](https://github.com/favware/esbuild-plugin-version-injector/commit/9ce2e905378acd9e1fe478e6ba6fb787df4be707))

## 🧪 Testing

- Update snapshots for new versions ([65c70eb](https://github.com/favware/esbuild-plugin-version-injector/commit/65c70eb2bec7040991572c7609076658906691b6))

# [1.1.0](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.0.4...v1.1.0) - (2023-03-18)

## 🚀 Features

- Fallback for esbuild results when this isn't solve loader (#38) ([1ee1356](https://github.com/favware/esbuild-plugin-version-injector/commit/1ee13568f85d247b67b08ce699a31e34fea74d61))

## 🧪 Testing

- Update test snapshots ([bfb9c92](https://github.com/favware/esbuild-plugin-version-injector/commit/bfb9c92810de1d39f069cefc3d6c5b133b51041a))

# [1.0.4](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.0.3...v1.0.4) - (2023-03-18)

## 🐛 Bug Fixes

- Declare string type for version export ([3733269](https://github.com/favware/esbuild-plugin-version-injector/commit/3733269f04285f3ace0ca8d27fd2bbda07a145dc))

## 🧪 Testing

- Fix coverage ([9b93fae](https://github.com/favware/esbuild-plugin-version-injector/commit/9b93fae37a9704aaad9383bcfc54a2b2ef99cb3e))
- Update snapshots for new versions ([1163553](https://github.com/favware/esbuild-plugin-version-injector/commit/11635537a5a3bf1c6148adf356632a4dddc033d5))

# [1.0.3](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.0.2...v1.0.3) - (2023-02-06)

## 🐛 Bug Fixes

- Change loader for .tsx files (#30) ([4cdb017](https://github.com/favware/esbuild-plugin-version-injector/commit/4cdb0177a63903cff6036b209ea9833f1248fb9d))

## 📝 Documentation

- **readme:** Remove all-contributors ([f238480](https://github.com/favware/esbuild-plugin-version-injector/commit/f23848070653ec1c6ee0118a5bdf8a3a16c5d336))

## 🧪 Testing

- Update snapshots for new versions ([40786af](https://github.com/favware/esbuild-plugin-version-injector/commit/40786af1b3625b4b230d6bc0527f1fe12548c825))

# [1.0.2](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.0.1...v1.0.2) - (2022-11-27)

## 🐛 Bug Fixes

- Regexp escape for Node 14 polyfill (#18) ([bfb809d](https://github.com/favware/esbuild-plugin-version-injector/commit/bfb809deaecf0e6dd7ae9134734c801e3ed4c604))

# [1.0.1](https://github.com/favware/esbuild-plugin-version-injector/compare/v1.0.0...v1.0.1) - (2022-11-26)

## 🐛 Bug Fixes

- Fixed support for NodeJS v14.x ([0bd74f6](https://github.com/favware/esbuild-plugin-version-injector/commit/0bd74f68017c7d3889bd22f174566f62e782673f))

## 📝 Documentation

- **readme:** Fix example for tsup ([41dc567](https://github.com/favware/esbuild-plugin-version-injector/commit/41dc56701d1b5925dda433445979fea555a6a04f))
- **readme:** Fix ToC ([325aef4](https://github.com/favware/esbuild-plugin-version-injector/commit/325aef4d90db9b7c3661f30a03979b0caf2fc97c))
- **readme:** Add ToC ([c376a17](https://github.com/favware/esbuild-plugin-version-injector/commit/c376a1741b09bbcd11290324598542f8be24da1b))
- **readme:** Add examples and options ([7796c68](https://github.com/favware/esbuild-plugin-version-injector/commit/7796c687cc5374390a5741cdfa3d17379dd02001))

# [1.0.0](https://github.com/favware/esbuild-plugin-version-injector/tree/v1.0.0) - (2022-10-07)

## 🐛 Bug Fixes

- Resolve esbuild loader dynamically ([75a8d67](https://github.com/favware/esbuild-plugin-version-injector/commit/75a8d67a4afee71e4e14446390027ea8ec3d6a82))

## 📝 Documentation

- Improve tsdoc ([631142e](https://github.com/favware/esbuild-plugin-version-injector/commit/631142e07d9141d1eed090dbd604b42162ce2014))
- **readme:** Fill in usage ([12a34fb](https://github.com/favware/esbuild-plugin-version-injector/commit/12a34fba6d760d650980321d7db066a8974711b1))
- Better tsdoc comment ([a441ffb](https://github.com/favware/esbuild-plugin-version-injector/commit/a441ffb87fa86282c91485de3ce0d6463943b099))
- **readme:** Add inspired by note ([597fe80](https://github.com/favware/esbuild-plugin-version-injector/commit/597fe80b191b61619105844d0760b5eadb9518d1))
- Update readme ([f932db9](https://github.com/favware/esbuild-plugin-version-injector/commit/f932db92ecc8606050a1002450218e1f58eb4370))

## 🚀 Features

- Implement plugin code ([45dbd4d](https://github.com/favware/esbuild-plugin-version-injector/commit/45dbd4d7a57ff887fe5550189364ee1192ac55f3))
- Detemplate the repo ([18e5047](https://github.com/favware/esbuild-plugin-version-injector/commit/18e5047289ba006038f9e3e313e0e929342d4f75))

## 🧪 Testing

- Add more edge case scenarios ([5e7a567](https://github.com/favware/esbuild-plugin-version-injector/commit/5e7a567620dcfcc5106bbb78c4ffb9096629f725))
- Reorganize files ([42f3bf1](https://github.com/favware/esbuild-plugin-version-injector/commit/42f3bf101f09fbe6789451998c6186121d742932))
- Finish up all test scenarios ([a6ee52e](https://github.com/favware/esbuild-plugin-version-injector/commit/a6ee52e55dd3543cab4b3ef5e1ebb8278678afdd))
- Start adding tests ([b66ade2](https://github.com/favware/esbuild-plugin-version-injector/commit/b66ade2bc3dba7e2be3748ba872b6edae70da227))

## 🪞 Styling

- Run prettier ([2a3310f](https://github.com/favware/esbuild-plugin-version-injector/commit/2a3310fe7c6b3d2e6527875140c0bbcf8b7a1318))

