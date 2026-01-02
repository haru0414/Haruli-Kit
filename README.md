# Haruli Kit

個人開發工具庫 - 收集常用的套件、程式碼片段和 UI 元件，讓新專案的建置更加快速高效。

## 功能特色

| 功能 | 說明 |
|------|------|
| **套件庫** | 常用 npm 套件集合，支援搜尋/分類篩選，一鍵複製安裝指令 |
| **程式碼片段** | 實用的 Custom Hooks、工具函式，附帶語法高亮 |
| **元件展示** | 可複用的 UI 元件，含即時預覽與完整程式碼 |
| **文件筆記** | 開發筆記與最佳實踐記錄 (持續擴充中) |

## 技術棧

- **框架**: Next.js 16 (App Router)
- **樣式**: Tailwind CSS
- **語言**: TypeScript
- **程式碼高亮**: Prism React Renderer
- **圖標**: Lucide React
- **設計系統**: 基於 [UI/UX Pro Max](https://github.com/anthropics/claude-code-uipro) Bento Grid 風格

## 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000) 預覽網站。

### 建置專案

```bash
npm run build
```

## 專案結構

```
haruli-kit/
├── src/
│   ├── app/                  # 頁面路由
│   │   ├── page.tsx          # 首頁
│   │   ├── packages/         # 套件庫
│   │   ├── snippets/         # 程式碼片段
│   │   ├── components/       # 元件展示
│   │   └── docs/             # 文件筆記
│   ├── components/           # 共用元件
│   │   ├── layout/           # 版面元件
│   │   └── ui/               # UI 元件
│   ├── data/                 # JSON 資料
│   │   ├── packages.json     # 套件資料
│   │   ├── snippets.json     # 程式碼片段
│   │   └── components.json   # 元件資料
│   ├── lib/                  # 工具函式
│   └── types/                # TypeScript 型別
└── content/                  # MDX 文件 (預留)
```

## 新增內容

### 新增套件

編輯 `src/data/packages.json`：

```json
{
  "id": "package-id",
  "name": "Package Name",
  "description": "套件描述",
  "installCommand": "npm install package-name",
  "category": "ui",
  "tags": ["tag1", "tag2"],
  "documentation": "https://docs.example.com",
  "npm": "https://www.npmjs.com/package/package-name",
  "github": "https://github.com/user/repo"
}
```

### 新增程式碼片段

編輯 `src/data/snippets.json`：

```json
{
  "id": "snippet-id",
  "title": "Snippet Title",
  "description": "片段描述",
  "language": "typescript",
  "category": "hooks",
  "tags": ["tag1", "tag2"],
  "code": "// 你的程式碼"
}
```

### 新增 UI 元件

編輯 `src/data/components.json`：

```json
{
  "id": "component-id",
  "name": "Component Name",
  "description": "元件描述",
  "category": "button",
  "tags": ["tag1", "tag2"],
  "preview": true,
  "code": "// 元件程式碼"
}
```

## 設計系統

### 色彩

| 用途 | Light Mode | Dark Mode |
|------|------------|-----------|
| Primary | `#3B82F6` | `#3B82F6` |
| Background | `#F8FAFC` | `#0F172A` |
| Card | `#FFFFFF` | `#1E293B` |
| Text | `#1E293B` | `#F1F5F9` |
| Border | `#E2E8F0` | `#334155` |

### 字體

- **內文**: Inter
- **程式碼**: JetBrains Mono

## 部署

推薦使用 [Vercel](https://vercel.com) 部署：

```bash
npm run build
```

或直接連結 GitHub 倉庫進行自動部署。

## License

MIT
