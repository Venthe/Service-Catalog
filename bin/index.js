#!/usr/bin/env node

const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const readInput = require('./input')
const parseOutput = require('./parse')
const { saveFile } = require('./file')

// input
// output
// inputFormat
// outputFormat
const argv = yargs(hideBin(process.argv)).argv

const document = readInput(argv.input, argv.inputFormat)
const result = parseOutput(document, argv.outputFormat)
saveFile(result, argv.output)