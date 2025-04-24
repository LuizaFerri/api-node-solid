import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    (async () => {
      const tsconfigPaths = (await import('vite-tsconfig-paths')).default;
      return tsconfigPaths();
    })(),
  ],
})