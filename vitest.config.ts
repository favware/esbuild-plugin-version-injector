import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'tests/vitest-setup.ts',
    threads: false
  },
  esbuild: {
    target: 'es2021'
  }
});
