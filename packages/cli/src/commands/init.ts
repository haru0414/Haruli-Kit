import chalk from 'chalk';
import ora from 'ora';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import {
  loadPresetIndex,
  loadPreset,
  resolvePresets,
  mergePackages,
  getBundlePresets,
  listPresetsByCategory,
} from '../utils/presets.js';

interface InitOptions {
  bundle?: string;
  presets?: string[];
  skipInstall?: boolean;
  template?: 'next' | 'vite' | 'none';
}

export async function initCommand(projectName: string | undefined, options: InitOptions) {
  console.log();
  console.log(chalk.bold.hex('#F97316')('  ⚔️  Haruli Kit - Project Initializer'));
  console.log();

  // Step 1: Get project name
  let finalProjectName: string = projectName || '';
  if (!finalProjectName) {
    const { name } = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: 'my-app',
        validate: (input: string) => {
          if (!/^[a-z0-9-]+$/.test(input)) {
            return 'Project name can only contain lowercase letters, numbers, and hyphens';
          }
          return true;
        },
      },
    ]);
    finalProjectName = name;
  }

  const projectPath = path.resolve(process.cwd(), finalProjectName);

  // Check if directory exists
  if (fs.existsSync(projectPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory ${finalProjectName} already exists. Overwrite?`,
        default: false,
      },
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('\n  Aborted.\n'));
      process.exit(0);
    }

    await fs.remove(projectPath);
  }

  // Step 2: Select template
  let template = options.template;
  if (!template) {
    const { selectedTemplate } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedTemplate',
        message: 'Select a template:',
        choices: [
          { name: 'Next.js (App Router)', value: 'next' },
          { name: 'Vite + React', value: 'vite' },
          { name: 'None (add to existing project)', value: 'none' },
        ],
      },
    ]);
    template = selectedTemplate;
  }

  // Step 3: Select presets
  let selectedPresets: string[] = [];

  if (options.bundle) {
    selectedPresets = getBundlePresets(options.bundle);
    if (selectedPresets.length === 0) {
      console.log(chalk.red(`\n  Unknown bundle: ${options.bundle}`));
      console.log(chalk.gray(`  Run ${chalk.cyan('haruli list')} to see available bundles.\n`));
      process.exit(1);
    }
    console.log(chalk.gray(`  Using bundle: ${options.bundle}`));
  } else if (options.presets) {
    selectedPresets = options.presets;
  } else {
    // Interactive preset selection
    const index = loadPresetIndex();
    const byCategory = listPresetsByCategory();

    const choices: { name: string; value: string; checked: boolean }[] = [];

    for (const [category, presets] of Object.entries(byCategory)) {
      const categoryName = index.categories[category] || category;
      choices.push(new inquirer.Separator(`── ${categoryName} ──`) as any);

      for (const preset of presets) {
        const isRecommended = index.presets.find((p) => p.name === preset.name)?.recommended;
        choices.push({
          name: `${preset.icon} ${preset.name} - ${preset.description}`,
          value: preset.name,
          checked: isRecommended || false,
        });
      }
    }

    const { presets } = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'presets',
        message: 'Select presets to install:',
        choices,
        pageSize: 15,
      },
    ]);

    selectedPresets = presets;
  }

  // Step 4: Create project
  const spinner = ora('Creating project...').start();

  try {
    if (template === 'next') {
      spinner.text = 'Creating Next.js project...';
      await execa(
        'npx',
        [
          'create-next-app@latest',
          finalProjectName,
          '--typescript',
          '--tailwind',
          '--eslint',
          '--app',
          '--src-dir',
          '--import-alias', '@/*',
          '--use-npm',
        ],
        { stdio: 'pipe' }
      );
    } else if (template === 'vite') {
      spinner.text = 'Creating Vite project...';
      await execa(
        'npx',
        ['create-vite@latest', finalProjectName, '--template', 'react-ts'],
        { stdio: 'pipe' }
      );

      // Install Tailwind for Vite
      spinner.text = 'Setting up Tailwind CSS...';
      await execa('npm', ['install', '-D', 'tailwindcss', 'postcss', 'autoprefixer'], {
        cwd: projectPath,
      });
      await execa('npx', ['tailwindcss', 'init', '-p'], { cwd: projectPath });
    } else {
      // Just create directory
      await fs.ensureDir(projectPath);
      await execa('npm', ['init', '-y'], { cwd: projectPath });
    }

    // Step 5: Install selected presets
    if (selectedPresets.length > 0 && !options.skipInstall) {
      spinner.text = 'Resolving presets...';
      const resolvedPresets = resolvePresets(selectedPresets);
      const { dependencies, devDependencies } = mergePackages(resolvedPresets);

      if (dependencies.length > 0) {
        spinner.text = `Installing ${dependencies.length} dependencies...`;
        await execa('npm', ['install', ...dependencies], { cwd: projectPath });
      }

      if (devDependencies.length > 0) {
        spinner.text = `Installing ${devDependencies.length} dev dependencies...`;
        await execa('npm', ['install', '-D', ...devDependencies], { cwd: projectPath });
      }
    }

    spinner.succeed(chalk.green('Project created successfully!'));

    // Show summary
    console.log();
    console.log(chalk.bold('  Project created at:'));
    console.log(chalk.cyan(`    ${projectPath}`));
    console.log();

    if (selectedPresets.length > 0) {
      console.log(chalk.bold('  Installed presets:'));
      const resolvedPresets = resolvePresets(selectedPresets);
      for (const preset of resolvedPresets) {
        console.log(`    ${preset.icon} ${chalk.cyan(preset.name)}`);
      }
      console.log();
    }

    console.log(chalk.bold('  Next steps:'));
    console.log(chalk.gray(`    cd ${finalProjectName}`));
    console.log(chalk.gray('    npm run dev'));
    console.log();

  } catch (error) {
    spinner.fail(chalk.red('Failed to create project'));
    console.error(error);
    process.exit(1);
  }
}
