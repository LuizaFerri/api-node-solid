import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    (async () => {
      const { default: tsconfigPaths } = await import('vite-tsconfig-paths')
      return tsconfigPaths()
    })(),
  ],
  test: {
    globals: true,
    environment: 'node',
  },
})