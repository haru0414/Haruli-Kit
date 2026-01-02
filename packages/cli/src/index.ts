#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';

const program = new Command();

// ASCII Art Banner
const banner = `
${chalk.hex('#F97316')('  ╦ ╦╔═╗╦═╗╦ ╦╦  ╦')}
${chalk.hex('#F97316')('  ╠═╣╠═╣╠╦╝║ ║║  ║')}
${chalk.hex('#F97316')('  ╩ ╩╩ ╩╩╚═╚═╝╩═╝╩')}
${chalk.gray('  Developer Toolkit CLI')}
`;

program
  .name('haruli')
  .description('Haruli Kit - 快速初始化專案的開發工具')
  .version('1.0.0')
  .addHelpText('before', banner);

// Init command
program
  .command('init [project-name]')
  .description('Create a new project with selected presets')
  .option('-b, --bundle <name>', 'Use a preset bundle (e.g., spa, dashboard, fullstack)')
  .option('-p, --presets <names...>', 'Specify presets to install')
  .option('-t, --template <type>', 'Project template: next, vite, or none')
  .option('--skip-install', 'Skip npm install')
  .action(initCommand);

// Add command
program
  .command('add <presets...>')
  .description('Add presets to an existing project')
  .option('-v, --variant <name>', 'Specify variant for presets with multiple options')
  .action(addCommand);

// List command
program
  .command('list')
  .alias('ls')
  .description('List all available presets and bundles')
  .action(listCommand);

// Parse arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(banner);
  program.outputHelp();
}
