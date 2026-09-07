import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

const excludeFromTests = [
  'src/generated/**',
  'src/prisma/**'
];

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    root: './',
    include: ['**/*.e2e-spec.ts'],
    exclude: excludeFromTests,
    setupFiles: ['./test/setup.ts'],
    coverage: {
      provider: 'v8',
      skipFull: true
    },
  },
});
