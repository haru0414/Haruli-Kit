#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";
import chalk4 from "chalk";

// src/commands/init.ts
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import fs2 from "fs-extra";
import path2 from "path";
import inquirer from "inquirer";

// src/utils/presets.ts
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
var __dirname = path.dirname(fileURLToPath(import.meta.url));
function getPresetsDir() {
  const possiblePaths = [
    // Development: from src/utils -> ../../presets (root)
    path.resolve(__dirname, "../../../../presets"),
    // Development: from dist -> ../../../presets (root)
    path.resolve(__dirname, "../../../presets"),
    // Production npm: bundled in package
    path.resolve(__dirname, "../presets"),
    path.resolve(__dirname, "./presets")
  ];
  for (const p of possiblePaths) {
    if (fs.existsSync(path.join(p, "index.json"))) {
      return p;
    }
  }
  throw new Error("Could not find presets directory");
}
function loadPresetIndex() {
  const indexPath = path.join(getPresetsDir(), "index.json");
  return fs.readJsonSync(indexPath);
}
function loadPreset(name) {
  const presetPath = path.join(getPresetsDir(), `${name}.json`);
  return fs.readJsonSync(presetPath);
}
function resolvePresets(names) {
  const resolved = /* @__PURE__ */ new Set();
  const presets = [];
  function resolve(name) {
    if (resolved.has(name)) return;
    resolved.add(name);
    const preset = loadPreset(name);
    if (preset.extends) {
      for (const ext of preset.extends) {
        resolve(ext);
      }
    }
    presets.push(preset);
  }
  for (const name of names) {
    resolve(name);
  }
  return presets;
}
function mergePackages(presets) {
  const deps = /* @__PURE__ */ new Set();
  const devDeps = /* @__PURE__ */ new Set();
  for (const preset of presets) {
    if (preset.packages?.dependencies) {
      for (const dep of preset.packages.dependencies) {
        deps.add(dep);
      }
    }
    if (preset.packages?.devDependencies) {
      for (const dep of preset.packages.devDependencies) {
        devDeps.add(dep);
      }
    }
  }
  return {
    dependencies: Array.from(deps).sort(),
    devDependencies: Array.from(devDeps).sort()
  };
}
function getBundlePresets(bundleName) {
  const index = loadPresetIndex();
  return index.bundles[bundleName] || [];
}
function listPresetsByCategory() {
  const index = loadPresetIndex();
  const result = {};
  for (const preset of index.presets) {
    const category = preset.category || "other";
    if (!result[category]) {
      result[category] = [];
    }
    const presetData = loadPreset(preset.name);
    result[category].push({
      name: preset.name,
      description: preset.description,
      icon: presetData.icon || "\u{1F4E6}"
    });
  }
  return result;
}

// src/commands/init.ts
async function initCommand(projectName, options) {
  console.log();
  console.log(chalk.bold.hex("#F97316")("  \u2694\uFE0F  Haruli Kit - Project Initializer"));
  console.log();
  let finalProjectName = projectName || "";
  if (!finalProjectName) {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Project name:",
        default: "my-app",
        validate: (input) => {
          if (!/^[a-z0-9-]+$/.test(input)) {
            return "Project name can only contain lowercase letters, numbers, and hyphens";
          }
          return true;
        }
      }
    ]);
    finalProjectName = name;
  }
  const projectPath = path2.resolve(process.cwd(), finalProjectName);
  if (fs2.existsSync(projectPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: "confirm",
        name: "overwrite",
        message: `Directory ${finalProjectName} already exists. Overwrite?`,
        default: false
      }
    ]);
    if (!overwrite) {
      console.log(chalk.yellow("\n  Aborted.\n"));
      process.exit(0);
    }
    await fs2.remove(projectPath);
  }
  let template = options.template;
  if (!template) {
    const { selectedTemplate } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedTemplate",
        message: "Select a template:",
        choices: [
          { name: "Next.js (App Router)", value: "next" },
          { name: "Vite + React", value: "vite" },
          { name: "None (add to existing project)", value: "none" }
        ]
      }
    ]);
    template = selectedTemplate;
  }
  let selectedPresets = [];
  if (options.bundle) {
    selectedPresets = getBundlePresets(options.bundle);
    if (selectedPresets.length === 0) {
      console.log(chalk.red(`
  Unknown bundle: ${options.bundle}`));
      console.log(chalk.gray(`  Run ${chalk.cyan("haruli list")} to see available bundles.
`));
      process.exit(1);
    }
    console.log(chalk.gray(`  Using bundle: ${options.bundle}`));
  } else if (options.presets) {
    selectedPresets = options.presets;
  } else {
    const index = loadPresetIndex();
    const byCategory = listPresetsByCategory();
    const choices = [];
    for (const [category, presets2] of Object.entries(byCategory)) {
      const categoryName = index.categories[category] || category;
      choices.push(new inquirer.Separator(`\u2500\u2500 ${categoryName} \u2500\u2500`));
      for (const preset of presets2) {
        const isRecommended = index.presets.find((p) => p.name === preset.name)?.recommended;
        choices.push({
          name: `${preset.icon} ${preset.name} - ${preset.description}`,
          value: preset.name,
          checked: isRecommended || false
        });
      }
    }
    const { presets } = await inquirer.prompt([
      {
        type: "checkbox",
        name: "presets",
        message: "Select presets to install:",
        choices,
        pageSize: 15
      }
    ]);
    selectedPresets = presets;
  }
  const spinner = ora("Creating project...").start();
  try {
    if (template === "next") {
      spinner.text = "Creating Next.js project...";
      await execa(
        "npx",
        [
          "create-next-app@latest",
          finalProjectName,
          "--typescript",
          "--tailwind",
          "--eslint",
          "--app",
          "--src-dir",
          "--import-alias",
          "@/*",
          "--use-npm"
        ],
        { stdio: "pipe" }
      );
    } else if (template === "vite") {
      spinner.text = "Creating Vite project...";
      await execa(
        "npx",
        ["create-vite@latest", finalProjectName, "--template", "react-ts"],
        { stdio: "pipe" }
      );
      spinner.text = "Setting up Tailwind CSS...";
      await execa("npm", ["install", "-D", "tailwindcss", "postcss", "autoprefixer"], {
        cwd: projectPath
      });
      await execa("npx", ["tailwindcss", "init", "-p"], { cwd: projectPath });
    } else {
      await fs2.ensureDir(projectPath);
      await execa("npm", ["init", "-y"], { cwd: projectPath });
    }
    if (selectedPresets.length > 0 && !options.skipInstall) {
      spinner.text = "Resolving presets...";
      const resolvedPresets = resolvePresets(selectedPresets);
      const { dependencies, devDependencies } = mergePackages(resolvedPresets);
      if (dependencies.length > 0) {
        spinner.text = `Installing ${dependencies.length} dependencies...`;
        await execa("npm", ["install", ...dependencies], { cwd: projectPath });
      }
      if (devDependencies.length > 0) {
        spinner.text = `Installing ${devDependencies.length} dev dependencies...`;
        await execa("npm", ["install", "-D", ...devDependencies], { cwd: projectPath });
      }
    }
    spinner.succeed(chalk.green("Project created successfully!"));
    console.log();
    console.log(chalk.bold("  Project created at:"));
    console.log(chalk.cyan(`    ${projectPath}`));
    console.log();
    if (selectedPresets.length > 0) {
      console.log(chalk.bold("  Installed presets:"));
      const resolvedPresets = resolvePresets(selectedPresets);
      for (const preset of resolvedPresets) {
        console.log(`    ${preset.icon} ${chalk.cyan(preset.name)}`);
      }
      console.log();
    }
    console.log(chalk.bold("  Next steps:"));
    console.log(chalk.gray(`    cd ${finalProjectName}`));
    console.log(chalk.gray("    npm run dev"));
    console.log();
  } catch (error) {
    spinner.fail(chalk.red("Failed to create project"));
    console.error(error);
    process.exit(1);
  }
}

// src/commands/add.ts
import chalk2 from "chalk";
import ora2 from "ora";
import { execa as execa2 } from "execa";
import fs3 from "fs-extra";
import path3 from "path";
import inquirer2 from "inquirer";
async function addCommand(presetNames, options) {
  const cwd = process.cwd();
  const packageJsonPath = path3.join(cwd, "package.json");
  if (!fs3.existsSync(packageJsonPath)) {
    console.log(chalk2.red("\n  Error: No package.json found in current directory."));
    console.log(chalk2.gray("  Run this command in a project root directory.\n"));
    process.exit(1);
  }
  const index = loadPresetIndex();
  const validPresets = index.presets.map((p) => p.name);
  for (const name of presetNames) {
    if (!validPresets.includes(name)) {
      console.log(chalk2.red(`
  Error: Unknown preset "${name}"`));
      console.log(chalk2.gray(`  Run ${chalk2.cyan("haruli list")} to see available presets.
`));
      process.exit(1);
    }
  }
  const presetsWithVariants = [];
  for (const name of presetNames) {
    const preset = loadPreset(name);
    if (preset.variants && !options.variant) {
      presetsWithVariants.push(name);
    }
  }
  const variantChoices = {};
  for (const name of presetsWithVariants) {
    const preset = loadPreset(name);
    if (preset.variants) {
      const { variant } = await inquirer2.prompt([
        {
          type: "list",
          name: "variant",
          message: `Select variant for ${chalk2.cyan(name)}:`,
          choices: Object.entries(preset.variants).map(([key, value]) => ({
            name: `${key} - ${value.description}`,
            value: key
          }))
        }
      ]);
      variantChoices[name] = variant;
    }
  }
  console.log();
  const spinner = ora2("Resolving presets...").start();
  try {
    const resolvedPresets = resolvePresets(presetNames);
    for (const preset of resolvedPresets) {
      if (preset.variants && variantChoices[preset.name]) {
        const variant = preset.variants[variantChoices[preset.name]];
        preset.packages = variant.packages;
      }
    }
    const { dependencies, devDependencies } = mergePackages(resolvedPresets);
    spinner.text = "Installing dependencies...";
    if (dependencies.length > 0) {
      spinner.text = `Installing ${dependencies.length} dependencies...`;
      await execa2("npm", ["install", ...dependencies], { cwd });
    }
    if (devDependencies.length > 0) {
      spinner.text = `Installing ${devDependencies.length} dev dependencies...`;
      await execa2("npm", ["install", "-D", ...devDependencies], { cwd });
    }
    spinner.succeed(chalk2.green("Packages installed successfully!"));
    console.log();
    console.log(chalk2.bold("  Installed presets:"));
    for (const preset of resolvedPresets) {
      const variant = variantChoices[preset.name];
      const variantLabel = variant ? chalk2.gray(` (${variant})`) : "";
      console.log(`    ${preset.icon} ${chalk2.cyan(preset.name)}${variantLabel}`);
    }
    const notes = resolvedPresets.filter((p) => p.notes).map((p) => p.notes);
    if (notes.length > 0) {
      console.log();
      console.log(chalk2.yellow("  Notes:"));
      for (const note of notes) {
        console.log(chalk2.gray(`    - ${note}`));
      }
    }
    console.log();
  } catch (error) {
    spinner.fail(chalk2.red("Failed to install packages"));
    console.error(error);
    process.exit(1);
  }
}

// src/commands/list.ts
import chalk3 from "chalk";
async function listCommand() {
  const index = loadPresetIndex();
  const byCategory = listPresetsByCategory();
  console.log();
  console.log(chalk3.bold.hex("#F97316")("  \u2694\uFE0F  Haruli Kit - Available Presets"));
  console.log(chalk3.gray(`  Version ${index.version}`));
  console.log();
  const categoryNames = index.categories;
  for (const [category, presets] of Object.entries(byCategory)) {
    const categoryLabel = categoryNames[category] || category;
    console.log(chalk3.bold.white(`  ${categoryLabel}`));
    console.log(chalk3.gray("  " + "\u2500".repeat(40)));
    for (const preset of presets) {
      console.log(
        `    ${preset.icon} ${chalk3.cyan(preset.name.padEnd(12))} ${chalk3.gray(preset.description)}`
      );
    }
    console.log();
  }
  console.log(chalk3.bold.white("  Bundles (\u5FEB\u901F\u7D44\u5408)"));
  console.log(chalk3.gray("  " + "\u2500".repeat(40)));
  for (const [name, presets] of Object.entries(index.bundles)) {
    console.log(
      `    ${chalk3.yellow(name.padEnd(12))} ${chalk3.gray(presets.join(", "))}`
    );
  }
  console.log();
  console.log(chalk3.gray("  Usage:"));
  console.log(chalk3.gray("    haruli add <preset>      Add a preset to current project"));
  console.log(chalk3.gray("    haruli init --bundle spa Create new project with bundle"));
  console.log();
}

// src/index.ts
var program = new Command();
var banner = `
${chalk4.hex("#F97316")("  \u2566 \u2566\u2554\u2550\u2557\u2566\u2550\u2557\u2566 \u2566\u2566  \u2566")}
${chalk4.hex("#F97316")("  \u2560\u2550\u2563\u2560\u2550\u2563\u2560\u2566\u255D\u2551 \u2551\u2551  \u2551")}
${chalk4.hex("#F97316")("  \u2569 \u2569\u2569 \u2569\u2569\u255A\u2550\u255A\u2550\u255D\u2569\u2550\u255D\u2569")}
${chalk4.gray("  Developer Toolkit CLI")}
`;
program.name("haruli").description("Haruli Kit - \u5FEB\u901F\u521D\u59CB\u5316\u5C08\u6848\u7684\u958B\u767C\u5DE5\u5177").version("1.0.0").addHelpText("before", banner);
program.command("init [project-name]").description("Create a new project with selected presets").option("-b, --bundle <name>", "Use a preset bundle (e.g., spa, dashboard, fullstack)").option("-p, --presets <names...>", "Specify presets to install").option("-t, --template <type>", "Project template: next, vite, or none").option("--skip-install", "Skip npm install").action(initCommand);
program.command("add <presets...>").description("Add presets to an existing project").option("-v, --variant <name>", "Specify variant for presets with multiple options").action(addCommand);
program.command("list").alias("ls").description("List all available presets and bundles").action(listCommand);
program.parse();
if (!process.argv.slice(2).length) {
  console.log(banner);
  program.outputHelp();
}
