import { defineConfig } from 'tsup'
import { dependencies, peerDependencies } from './package.json'

export default defineConfig({
  clean: true,
  entry: ['src/index.ts'],
  treeshake: true,
  sourcemap: true,
  minify: false,
  dts: true,
  splitting: false,
  format: ['cjs', 'esm'],
  external: [...Object.keys(dependencies), ...Object.keys(peerDependencies)],
})
