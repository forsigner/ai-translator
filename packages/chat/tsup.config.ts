import { defineConfig } from 'tsup'
import { dependencies } from './package.json'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  treeshake: true,
  sourcemap: true,
  minify: false,
  dts: true,
  splitting: false,
  format: ['cjs', 'esm'],
  external: [...Object.keys(dependencies)],
})
