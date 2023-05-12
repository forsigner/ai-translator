import yargs, { ArgumentsCamelCase } from 'yargs'
import { Config, readConfig, writeConfig } from '../config'

class Command {
  readonly command = 'config [list]'
  readonly describe = 'Configure ai translator'

  readonly builder = (args: yargs.Argv) => {
    return args
      .positional('to', {
        describe: 'Target language',
        type: 'string',
      })
      .positional('openaiApiKey', {
        describe: 'Openai API Key',
        type: 'string',
      })
      .positional('provider', {
        describe: 'Translate provider',
        type: 'string',
      })
      .showHelpOnFail(true)
      .strict()
  }

  handler = async (args: ArgumentsCamelCase<Config & { list: string }>) => {
    const { _, $0, list, ...rest } = args

    if (list) {
      const config = await readConfig()
      console.log(JSON.stringify(config, null, 2))
    } else {
      await writeConfig(rest)
    }
  }
}

const config = new Command()

export default config
