import { PluginOption } from 'vite'
import * as esbuild from 'esbuild'

async function build() {
  console.log('\nbuild content script......')
  await esbuild.build({
    entryPoints: ['src/pages/content/index.ts'],
    bundle: true,
    outfile: 'dist/content.js',
  })
}

export default function buildContentScript(): PluginOption {
  return {
    name: 'build-content-script',

    async load(id) {
      if (id.includes('pages/content')) await build()
    },
    async buildEnd() {
      await build()
    },
  }
}
