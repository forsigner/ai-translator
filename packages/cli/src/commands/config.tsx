// import React from 'react'
import yargs from 'yargs'

class Command {
  readonly command = 'config'
  readonly describe = 'Configure ai translator'

  readonly builder = (args: yargs.Argv) => {
    return args.showHelpOnFail(true).strict()
  }

  handler = async () => {
    console.log('gogo.....')
  }
}

const config = new Command()

export default config
