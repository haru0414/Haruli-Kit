# Design Templates Collection

這是一個設計模板集合，收錄了多種獨特的 UI 風格供專案參考使用。

---

## Template 1: Ronin Toolkit (武士)

你是世界頂級的 UI/UX 設計師。請根據以下規格，為「個人開發工具庫（Personal Developer Toolkit）」網站設計一套極具風格的 UI 系統。目標是將參考圖中「現代武士與向量插畫」的氛圍轉化為一個精準、高效且視覺強烈的程式碼管理平台。

**1. 整體氛圍 (The Vibe)**
「賽璐珞向量美學遇見代碼紀律」——一種銳利、高對比度、帶有東方史詩感的現代開發者儀表板，將武士的專注與程式碼的精確性結合。

**2. 顏色調色盤 (Color Palette)**
從參考圖中提取的高對比配色，對應 Tailwind CSS：

- **Background (夜幕深藍)**: `#0F172A` (Slate-900) - 用於主背景，模擬圖中的暗部。
- **Surface (武士服青)**: `#1E293B` (Slate-800) 搭配 `#334155` (Slate-700) - 用於卡片與側邊欄。
- **Primary Accent (落日橘)**: `#FB923C` (Orange-400) to `#F97316` (Orange-500) - 用於 CTA 按鈕、Logo 與強調文字（象徵圖中的太陽）。
- **Secondary Accent (刀光藍/雲朵黃)**: `#38BDF8` (Sky-400) 用於程式碼高亮，`#FEF3C7` (Amber-100) 用於次要文字或背景裝飾。
- **Text**: `#F8FAFC` (Slate-50) 為主標題，`#94A3B8` (Slate-400) 為副標題。

**3. 字體排印 (Typography)**

- **Headings**: 使用 **'Space Grotesk'** 或 **'Chakra Petch'**。粗體 (Bold 700)，字距微寬 (tracking-wide)，邊緣銳利。
- **Body/Code**: 強制使用 **'JetBrains Mono'** 或 **'Fira Code'**。這是開發者工具庫，程式碼的可讀性是核心。Line-height 設置為 `leading-relaxed`。

**4. UI 元素 (The Atoms)**

- **Buttons**: **完全不圓角 (rounded-none)** 或極小圓角 (rounded-sm)。必須帶有類似漫畫風格的「硬邊陰影 (Hard Shadow)」，例如 `box-shadow: 4px 4px 0px #F97316`，懸停時陰影收縮。
- **Cards**: 使用「玻璃擬態」但帶有硬邊框。Background opacity 90%，Border color `#334155`，並帶有鋒利的 `clip-path` 切角設計（模擬刀切效果）。
- **Inputs**: 背景深色，Focus 時顯示亮橘色或青色光暈環 (ring-2 ring-orange-400)。

**5. 佈局與空間 (Layout & Spacing)**

- **Whitespace**: 寬敞大氣 (Spacious)。模仿圖中天空的留白，讓程式碼片段成為主角。
- **Grid**: 嚴格的模組化網格 (Bento Grid)，區塊之間線條分明，像漫畫分鏡一樣切割畫面。

**6. 用戶體驗與互動限制 (User Constraints)**

- **Depth & 3D**: 利用 Parallax (視差滾動)。背景的「落日」圖形應固定或緩慢移動，前景的內容卡片快速移動，模仿圖中岩石與遠景的層次感。
- **Motion**: 進入動畫必須是「斬擊式 (Slashing)」效果——內容從對角線切入或快速滑入。Hover 效果要乾脆俐落，無延遲。
- **Layout Architecture**:
  1. **Hero Section**: 左側為大標題與搜尋欄（Command Palette 風格），右側或背景為巨大的 CSS 繪製的「落日」與動態懸浮的 3D 程式碼方塊。
  2. **Quick Access Toolbar**: 橫向滾動的常用工具圖示。
  3. **The Armory (Bento Grid)**: 展示 UI 元件庫、Snippets、Packages 的分類卡片。
  4. **Code Editor Preview**: 一個互動式的 IDE 模擬視窗，展示即時代碼。
  5. **Footer**: 底部使用鋸齒狀 SVG 分隔線（模仿岩石地形）。
- **Functional Components**:
  - **'The Katana Search'**: 一個全域搜索模態框 (Cmd+K)，樣式銳利，支持快速過濾語言 (JS, Python, CSS)。
  - **'Snippet Cards'**: 帶有「一鍵複製」功能的卡片，點擊複製時顯示「刀光閃過」的微動畫。
  - **'Dependency Graph'**: 互動式節點圖，顯示套件之間的依賴關係。

---

## Template 2: Retro Manga Pop (日系復古配色)

請扮演一位精通日系美學與敘事設計的資深前端架構師。請基於《排球少年》復古海報風格，為一位創意工作者打造一個具有強烈「敘事感（Storytelling）」的個人作品集網站。

**1. 設計靈魂 (The Vibe)**
「熱血復古漫畫風 (Retro-Manga Pop) 遇見 懷舊質感敘事 (Nostalgic Lo-fi Storytelling)」。網站應像是一本正在翻閱的動漫設定集，充滿紙張紋理、鮮明的青春色彩與動態的分鏡感。

**2. 顏色調色板 (Tailwind Mapping)**

- **背景 (Canvas):** 使用帶有暖色調的米黃色紙張質感 `bg-[#F2EAD3]` (Warm Paper) 或 `bg-stone-100`，並必須疊加一層 CSS Noise 噪點紋理。
- **主要文字 (Ink):** 深墨藍色 `text-[#1A2332]` (Slate-900)，模仿漫畫墨水。
- **強調色 (Accent A - Nekoma Red):** 復古朱紅色 `bg-[#C83E34]` (Red-700)，用於按鈕、標籤與強調重點。
- **強調色 (Accent B - Title Yellow):** 活力黃色 `text-[#FFC845]` (Amber-400)，用於大標題或裝飾性圖形。
- **輔助色 (Deep Teal):** 復古青綠 `bg-[#2F5C68]` (Cyan-900)，用於深色區塊或 Footer。

**3. 排版系統 (Typography)**

- **標題:** 使用厚重的無襯線字體 (如 `Oswald`, `Anton` 或 `Dela Gothic One`)，字距緊湊 (tracking-tight)，模擬海報上的粗體字。
- **內文:** 易讀的日系黑體或襯線體 (如 `Noto Sans JP` 或 `Shippori Mincho`)，行高設定寬鬆 (`leading-loose`) 以增加呼吸感。

**4. UI 元素與原子設計**

- **卡片 (Cards):** 採用「漫畫格 (Manga Panel)」設計。純色背景，2px-3px 的粗黑邊框 (`border-2 border-slate-900`)，並帶有堅硬的陰影 (`box-shadow: 6px 6px 0px #1A2332`)。Hover 時卡片輕微上浮，陰影變深。
- **按鈕 (Buttons):** 藥丸形 (`rounded-full`) 或剛硬矩形，高對比色 (紅底白字)，點擊時有明顯的「下壓」微動畫 (`active:translate-y-1`)。
- **裝飾:** 加入網點 (Halftone patterns)、對話框氣泡 (Speech bubbles) 作為 UI 提示。

**5. 佈局與架構 (Storytelling Layout)**

- **導航列 (Sticky Navbar):** 設計成類似「公車站牌」或「地鐵路線圖」的樣式，標示當前所在的「章節」。
- **Hero Section:** 分割畫面 (Split-screen)。左側為巨大的動態標題 (類似海報頂部)，右側為個人形象插畫或 3D 角色展示，背景有緩慢移動的雲朵動畫。
- **關於我 (About):** 「角色卡 (Character Sheet)」設計。包含雷達圖 (技能分析)、關鍵屬性 (Experience/Tools) 以及像漫畫介紹般的文字佈局。
- **作品集 (Projects):** 「選集 (Episode List)」佈局。使用橫向捲動 (Horizontal Scroll) 或 Bento Grid，每個專案像是一本漫畫單行本封面。
- **頁尾 (Footer):** 下集預告風格，包含大字體的「TO BE CONTINUED」與聯絡方式。

**6. 互動與動效 (Constraints)**

- **視差滾動 (Parallax):** 背景的網點、文字與前景元素必須有不同速度的滾動位移，營造 2.5D 的深度感。
- **轉場:** 頁面切換使用「翻頁」或「墨水暈染」效果。
- **敘事性:** 隨著使用者向下滾動，透過 ScrollTrigger 觸發元素依序滑入 (如漫畫分鏡一格格出現)，引導視線。

---

## Template 3: Neko Stencil Art (貓貓)

設計風格：「日系粗獷主義 (Neo-Brutalism) 遇上復古昭和海報」。這是一個極具故事性的個人部落格，視覺上必須重現強烈的紅黑對比與「版畫/模板塗鴉 (Stencil Art)」的質感。

**1. 核心氛圍**
一個充滿野性與敘事感的數位捲軸，結合了舊紙張的溫潤質感與高對比的視覺衝擊，彷彿在閱讀一本動態的日式漫畫或地下雜誌。

**2. 色彩計畫**

- **背景色 (Background):** `#F2EFE9` (使用 Tailwind `bg-stone-100` 或自定義 `bg-[#F2EFE9]`)，模擬陳舊的宣紙或畫布質感。
- **主視覺紅 (Primary Red):** `#D92525` (接近 `bg-red-600`)，用於強調色、按鈕背景與巨大標題，重現視覺衝擊。
- **墨色黑 (Ink Black):** `#1A1A1A` (使用 `text-neutral-900`)，用於主要文字與粗框線，模擬版畫墨跡。
- **質感紋理:** 必須在 CSS 中加入噪點 (Noise) 或紙張紋理 (Paper Grain) 覆蓋層 (overlay)，以還原斑駁感。

**3. 字體排版**

- **標題:** 使用粗壯的日系無襯線體 (如 Noto Sans JP Black 或類似的 Poster Fonts)，字距緊湊，模擬海報排版。
- **內文:** 使用高可讀性的襯線體 (Serif, 如 Noto Serif JP)，增加「說故事」的文學氣息。
- **特色:** 支援直排文字 (writing-mode: vertical-rl) 用於裝飾性標題。

**4. UI 組件設計 (原子設計)**

- **按鈕:** 不使用圓角 (rounded-none) 或微圓角，帶有「硬陰影 (Hard Shadow)」效果 (e.g., `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`)，Hover 時按鈕位移填滿陰影，創造按壓實體感。
- **卡片 (文章預覽):** 粗黑邊框 (`border-2 border-neutral-900`)，背景使用紙張色，Hover 時整體輕微旋轉或放大，並帶有素描線條的裝飾動畫。
- **圖片處理:** 所有圖片需經過 CSS 濾鏡處理 (High Contrast, Grayscale + Red Tint)，使其融入整體版畫風格。

**5. 連貫動畫與敘事性 (關鍵)**

- **捲軸敘事 (Scrollytelling):** 頁面必須有一條「視覺引導線」(例如一條紅色的線或墨跡)，隨著使用者滾動從頂部延伸到底部，串聯起 Hero Section、文章列表與頁尾，象徵「故事線」。
- **進場動畫:** 元素不應只是淡入，而應該像「蓋章」一樣重擊出現，或是像水墨暈染般展開。

**6. 佈局架構**

- **Sticky Nav:** 簡約，帶有磨損質感的 Logo。
- **Hero Section:** 巨型分屏設計，左側為超大日文標題，右側為插畫 (由 Scroll 觸發動態視差)。
- **Story/About:** 文字流動佈局，配合浮動的貼紙風格插圖。
- **Blog Grid (Bento Style):** 不規則網格，每個格子像漫畫分鏡一樣。
- **Footer:** 巨大的版權宣告與手寫風格簽名。
