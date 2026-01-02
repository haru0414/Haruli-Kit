import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Preset, PresetIndex } from './types.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function getPresetsDir(): string {
  // Try multiple possible locations
  const possiblePaths = [
    // Development: from src/utils -> ../../presets (root)
    path.resolve(__dirname, '../../../../presets'),
    // Development: from dist -> ../../../presets (root)
    path.resolve(__dirname, '../../../presets'),
    // Production npm: bundled in package
    path.resolve(__dirname, '../presets'),
    path.resolve(__dirname, './presets'),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(path.join(p, 'index.json'))) {
      return p;
    }
  }

  throw new Error('Could not find presets directory');
}

export function loadPresetIndex(): PresetIndex {
  const indexPath = path.join(getPresetsDir(), 'index.json');
  return fs.readJsonSync(indexPath);
}

export function loadPreset(name: string): Preset {
  const presetPath = path.join(getPresetsDir(), `${name}.json`);
  return fs.readJsonSync(presetPath);
}

export function resolvePresets(names: string[]): Preset[] {
  const resolved = new Set<string>();
  const presets: Preset[] = [];

  function resolve(name: string) {
    if (resolved.has(name)) return;
    resolved.add(name);

    const preset = loadPreset(name);

    // Resolve extended presets first
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

export function mergePackages(presets: Preset[]): {
  dependencies: string[];
  devDependencies: string[];
} {
  const deps = new Set<string>();
  const devDeps = new Set<string>();

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
    devDependencies: Array.from(devDeps).sort(),
  };
}

export function getBundlePresets(bundleName: string): string[] {
  const index = loadPresetIndex();
  return index.bundles[bundleName] || [];
}

export function listPresetsByCategory(): Record<string, { name: string; description: string; icon: string }[]> {
  const index = loadPresetIndex();
  const result: Record<string, { name: string; description: string; icon: string }[]> = {};

  for (const preset of index.presets) {
    const category = preset.category || 'other';
    if (!result[category]) {
      result[category] = [];
    }

    const presetData = loadPreset(preset.name);
    result[category].push({
      name: preset.name,
      description: preset.description,
      icon: presetData.icon || '📦',
    });
  }

  return result;
}
