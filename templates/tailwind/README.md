# Haruli Kit - Ronin Theme

武士風格的 Tailwind CSS 設計系統。

## 快速開始

### 1. 複製檔案

將以下檔案複製到你的專案：

```
templates/tailwind/
├── tailwind.config.ts  → 複製到專案根目錄
├── globals.css         → 複製到 src/app/globals.css (Next.js)
│                          或 src/index.css (Vite)
└── utils.ts            → 複製到 src/lib/utils.ts
```

### 2. 安裝依賴

```bash
npm install clsx tailwind-merge
```

### 3. 使用

```tsx
import { cn } from "@/lib/utils";

// 使用 cn() 合併 class
<button className={cn(
  "btn-katana",
  isActive && "bg-primary-light"
)}>
  Click me
</button>

// 使用預設元件樣式
<div className="card-cut p-6">
  <h2>Card Title</h2>
</div>

// 使用動畫
<div className="animate-fade-up">
  Animated content
</div>
```

## 設計系統

### 顏色

| 變數 | 值 | 用途 |
|------|-----|------|
| `--background` | #0F172A | 主背景色 |
| `--surface` | #1E293B | 卡片/元件背景 |
| `--primary` | #F97316 | 主色調（橘色） |
| `--accent-blue` | #38BDF8 | 強調色（藍色） |
| `--foreground` | #F8FAFC | 主要文字 |
| `--muted` | #94A3B8 | 次要文字 |

### 元件類別

| 類別 | 說明 |
|------|------|
| `.btn-katana` | 主要按鈕（硬陰影） |
| `.btn-ghost` | 幽靈按鈕 |
| `.btn-secondary` | 次要按鈕 |
| `.input-katana` | 輸入框 |
| `.card-cut` | 刀切角卡片 |
| `.cut-corners` | 刀切角效果 |
| `.cut-corners-sm` | 小型刀切角 |

### 背景效果

| 類別 | 說明 |
|------|------|
| `.ronin-sun` | 漸層太陽背景 |
| `.grid-bg` | 網格背景 |
| `.sunset-gradient` | 日落漸層 |

### 動畫

| 類別 | 說明 |
|------|------|
| `.animate-fade-up` | 向上淡入 |
| `.animate-slide-in` | 從右滑入 |
| `.animate-slash-in` | 刀光斬入 |
| `.animate-float` | 浮動效果 |
| `.stagger-children` | 子元素依序動畫 |

## 字體

- **Space Grotesk** - 標題與正文
- **JetBrains Mono** - 程式碼與 monospace

## 授權

MIT License
