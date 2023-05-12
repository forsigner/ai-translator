#!/usr/bin/env node
import React from 'react'
import yargs from 'yargs/yargs'
import { hideBin } from 'yargs/helpers'
import { render } from 'ink'
import config from './commands/config'
import { App } from './ui/App'

type CLI = {
  _: string[]
  $0: string
  [x: string]: any
}

const cli = yargs(hideBin(process.argv))
  .command(config as any)
  .alias('version', 'v')
  .describe('version', 'Show version information')
  .parse() as CLI

if (cli._) {
  render(<App input={cli._} />)
}
