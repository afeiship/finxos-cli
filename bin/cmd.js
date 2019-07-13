#!/usr/bin/env node

var yargs = require('yargs');
var { resolve } = require('path');
var commands = require('../index.js');

// Switch CWD if specified from options
var cwd = resolve(yargs.argv.cwd || process.cwd());
process.chdir(cwd);

// Init CLI commands and options
commands.forEach((cmd) => {
  yargs.command(cmd.command, cmd.desc, cmd.builder, cmd.handler);
});

yargs.help().argv;
