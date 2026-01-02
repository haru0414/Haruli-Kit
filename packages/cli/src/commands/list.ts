import chalk from 'chalk';
import { loadPresetIndex, listPresetsByCategory } from '../utils/presets.js';

export async function listCommand() {
  const index = loadPresetIndex();
  const byCategory = listPresetsByCategory();

  console.log();
  console.log(chalk.bold.hex('#F97316')('  ⚔️  Haruli Kit - Available Presets'));
  console.log(chalk.gray(`  Version ${index.version}`));
  console.log();

  const categoryNames = index.categories;

  for (const [category, presets] of Object.entries(byCategory)) {
    const categoryLabel = categoryNames[category] || category;
    console.log(chalk.bold.white(`  ${categoryLabel}`));
    console.log(chalk.gray('  ' + '─'.repeat(40)));

    for (const preset of presets) {
      console.log(
        `    ${preset.icon} ${chalk.cyan(preset.name.padEnd(12))} ${chalk.gray(preset.description)}`
      );
    }
    console.log();
  }

  // Show bundles
  console.log(chalk.bold.white('  Bundles (快速組合)'));
  console.log(chalk.gray('  ' + '─'.repeat(40)));

  for (const [name, presets] of Object.entries(index.bundles)) {
    console.log(
      `    ${chalk.yellow(name.padEnd(12))} ${chalk.gray(presets.join(', '))}`
    );
  }

  console.log();
  console.log(chalk.gray('  Usage:'));
  console.log(chalk.gray('    haruli add <preset>      Add a preset to current project'));
  console.log(chalk.gray('    haruli init --bundle spa Create new project with bundle'));
  console.log();
}
