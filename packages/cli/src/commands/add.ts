import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import { loadPresetIndex, loadPreset, resolvePresets, mergePackages } from '../utils/presets.js';

export async function addCommand(presetNames: string[], options: { variant?: string }) {
  const cwd = process.cwd();
  const packageJsonPath = path.join(cwd, 'package.json');

  // Check if we're in a valid project
  if (!fs.existsSync(packageJsonPath)) {
    console.log(chalk.red('\n  Error: No package.json found in current directory.'));
    console.log(chalk.gray('  Run this command in a project root directory.\n'));
    process.exit(1);
  }

  const index = loadPresetIndex();
  const validPresets = index.presets.map((p) => p.name);

  // Validate preset names
  for (const name of presetNames) {
    if (!validPresets.includes(name)) {
      console.log(chalk.red(`\n  Error: Unknown preset "${name}"`));
      console.log(chalk.gray(`  Run ${chalk.cyan('haruli list')} to see available presets.\n`));
      process.exit(1);
    }
  }

  // Check for variants
  const presetsWithVariants: string[] = [];
  for (const name of presetNames) {
    const preset = loadPreset(name);
    if (preset.variants && !options.variant) {
      presetsWithVariants.push(name);
    }
  }

  // If presets have variants, ask user to choose
  const variantChoices: Record<string, string> = {};
  for (const name of presetsWithVariants) {
    const preset = loadPreset(name);
    if (preset.variants) {
      const { variant } = await inquirer.prompt([
        {
          type: 'list',
          name: 'variant',
          message: `Select variant for ${chalk.cyan(name)}:`,
          choices: Object.entries(preset.variants).map(([key, value]) => ({
            name: `${key} - ${value.description}`,
            value: key,
          })),
        },
      ]);
      variantChoices[name] = variant;
    }
  }

  console.log();
  const spinner = ora('Resolving presets...').start();

  try {
    // Resolve all presets (including extended ones)
    const resolvedPresets = resolvePresets(presetNames);

    // Apply variant packages
    for (const preset of resolvedPresets) {
      if (preset.variants && variantChoices[preset.name]) {
        const variant = preset.variants[variantChoices[preset.name]];
        preset.packages = variant.packages;
      }
    }

    const { dependencies, devDependencies } = mergePackages(resolvedPresets);

    spinner.text = 'Installing dependencies...';

    // Install dependencies
    if (dependencies.length > 0) {
      spinner.text = `Installing ${dependencies.length} dependencies...`;
      await execa('npm', ['install', ...dependencies], { cwd });
    }

    // Install devDependencies
    if (devDependencies.length > 0) {
      spinner.text = `Installing ${devDependencies.length} dev dependencies...`;
      await execa('npm', ['install', '-D', ...devDependencies], { cwd });
    }

    spinner.succeed(chalk.green('Packages installed successfully!'));

    // Show summary
    console.log();
    console.log(chalk.bold('  Installed presets:'));
    for (const preset of resolvedPresets) {
      const variant = variantChoices[preset.name];
      const variantLabel = variant ? chalk.gray(` (${variant})`) : '';
      console.log(`    ${preset.icon} ${chalk.cyan(preset.name)}${variantLabel}`);
    }

    // Show notes
    const notes = resolvedPresets.filter((p) => p.notes).map((p) => p.notes);
    if (notes.length > 0) {
      console.log();
      console.log(chalk.yellow('  Notes:'));
      for (const note of notes) {
        console.log(chalk.gray(`    - ${note}`));
      }
    }

    console.log();
  } catch (error) {
    spinner.fail(chalk.red('Failed to install packages'));
    console.error(error);
    process.exit(1);
  }
}
