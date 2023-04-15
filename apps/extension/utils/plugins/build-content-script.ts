import { PluginOption } from 'vite'
import * as esbuild from 'esbuild'

const isProd = process.env.NODE_ENV === 'production'

async function build() {
  console.log('\nbuild content script......')
  await esbuild.build({
    entryPoints: ['src/pages/content/index.ts'],
    bundle: true,
    minify: isProd,
    outfile: 'dist/content.js',
  })
}

export default function buildContentScript(): PluginOption {
  return {
    name: 'build-content-script',

    async load(id) {
      if (!isProd) {
        if (id.includes('pages/content')) await build()
      }
    },
    async buildEnd() {
      setTimeout(
        async () => {
          await build()
        },
        isProd ? 100 : 0,
      )
    },
  }
}
