// 套件類型
export interface Package {
  id: string;
  name: string;
  description: string;
  installCommand: string;
  category: string;
  tags: string[];
  documentation?: string;
  npm?: string;
  github?: string;
}

// 程式碼片段類型
export interface Snippet {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  category: string;
  tags: string[];
}

// UI 元件類型
export interface UIComponent {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
  preview?: boolean;
  tags: string[];
}

// 文件類型
export interface Doc {
  slug: string;
  title: string;
  description: string;
  category: string;
  content: string;
}

// 分類類型
export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}
