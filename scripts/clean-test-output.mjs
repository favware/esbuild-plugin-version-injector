import { rm } from 'node:fs/promises';

const testBuildOutDir = new URL('../tests/build-out/', import.meta.url);
const testBuildMidDir = new URL('../tests/build-mid/', import.meta.url);

const options = { force: true, recursive: true };

await Promise.all([
  rm(testBuildMidDir, options), //
  rm(testBuildOutDir, options)
]);
