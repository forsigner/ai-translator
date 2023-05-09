#!/usr/bin/env node
import React from 'react'
import { render } from 'ink'
import meow from 'meow'
import App from './app.js'

const cli = meow(
  `
	Usage
	  $ translate

	Examples
	  $ translate Hello world
`,
  {
    importMeta: import.meta,
    flags: {},
  },
)

render(<App input={cli.input} />)
