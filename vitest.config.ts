import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'tests/common/vitest-setup.ts',
    threads: false,
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'cobertura']
    }
  },
  esbuild: {
    target: 'es2021'
  }
});
