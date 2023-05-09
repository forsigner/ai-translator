import os from 'os'
import { join } from 'path'
import jetpack from 'fs-jetpack'

interface Config {
  token: string
}

export function getConfigPath() {
  const fileName = '.ai-translator.json'
  const configPath = join(os.homedir(), fileName)
  return configPath
}

export async function writeConfig(config: Partial<Config>) {
  const configPath = getConfigPath()
  const currentConfig = await readConfig()
  const mergedConfig = { ...currentConfig, ...config }
  jetpack.write(configPath, mergedConfig)
}

export async function readConfig(): Promise<Config> {
  const configPath = getConfigPath()
  if (!jetpack.exists(configPath)) return {} as Config
  return jetpack.readAsync(configPath, 'json') || {}
}
