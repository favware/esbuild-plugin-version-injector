import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'tests/vitest-setup.ts',
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'clover']
    }
  },
  esbuild: {
    target: 'es2021'
  }
});
