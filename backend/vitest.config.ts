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
    include: ['**/*.spec.ts'],
    exclude: excludeFromTests,
    coverage: {
      provider: 'v8',
      exclude: excludeFromTests,
      skipFull: true
    }
  },
});
