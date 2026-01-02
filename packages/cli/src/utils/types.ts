export interface Preset {
  name: string;
  displayName: string;
  description: string;
  icon: string;
  extends?: string[];
  packages?: {
    dependencies?: string[];
    devDependencies?: string[];
  };
  variants?: Record<string, {
    description: string;
    packages: {
      dependencies?: string[];
      devDependencies?: string[];
    };
  }>;
  scripts?: Record<string, string>;
  configFiles?: Record<string, boolean>;
  notes?: string;
}

export interface PresetIndex {
  version: string;
  presets: {
    name: string;
    file: string;
    description: string;
    category: string;
    recommended?: boolean;
  }[];
  defaultPreset: string;
  bundles: Record<string, string[]>;
  categories: Record<string, string>;
}

export interface InitOptions {
  presets?: string[];
  bundle?: string;
  skipInstall?: boolean;
}
