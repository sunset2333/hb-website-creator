# 技术规范

## ⚠️ 使用前必读

**每次生成新项目前，执行以下检查：**
1. 在设计文档中确认色彩方案（主色/辅色/背景色/文字色），填入 CSS 变量，**禁止使用本文档中任何示例颜色值**
2. 在设计文档中确认页面清单和导航项名称，**禁止复用任何示例导航内容**
3. 根据视觉风格选择字体组合（见下方字体选择规则）
4. 根据页面需求选配 JS 交互（见下方交互菜单，不要全选）

如在输出代码中发现任何占位示例值（`[填入]` 字样）原封不动出现，视为错误，必须重新生成。

---

## 技术栈

**纯静态 HTML**，每个页面为独立的 `.html` 文件，内联 CSS（`<style>` 标签）和少量 JS（`<script>` 标签）。不使用任何框架（React、Vue、Angular、Bootstrap、Tailwind 等）。

每个 `.html` 文件是**完全自包含**的——双击即可在浏览器中打开。

---

## 文件结构

```
site/
├── index.html          ← 首页（必选）
├── [page-2].html       ← 按设计文档页面清单命名
├── [page-3].html       ← 按设计文档页面清单命名
└── assets/             ← 图片/字体等静态资源
```

页面文件名由**设计文档的页面清单**决定，不预设固定结构。

---

## HTML 架构规则

1. **每个页面是一个独立的 `.html` 文件**，包含完整的 `<!DOCTYPE html>`、`<head>`、`<body>`
2. **CSS 内联在 `<style>` 标签中**，位于 `<head>` 内。不使用外部 `.css` 文件
3. **JS 内联在 `<script>` 标签中**，位于 `</body>` 前。仅用于交互功能
4. **导航栏和页脚在每个页面中都完整写出**，确保每个文件独立可用
5. **页面间链接使用相对路径**：`<a href="about.html">`

---

## 核心原则

1. **语义化 HTML**：使用 `<header>`、`<nav>`、`<main>`、`<section>`、`<footer>`、`<article>` 等语义标签
2. **所有颜色通过 CSS 变量管理**：在 `:root` 中定义，**禁止在具体选择器中硬编码任何颜色字面量**
3. **图片使用 `<img>` 标签**（带 `alt` 文本和 `loading="lazy"`），或 `background-image`（装饰性图片）
4. **图标统一使用 Font Awesome 6.5 CDN**：`<i class="fas fa-xxx"></i>`
5. **字体加载**：使用 `fonts.loli.net`（中国大陆 Google Fonts 镜像），根据风格选择字体组合（见下方）
6. **深色模式**：用 `@media (prefers-color-scheme: dark)` 覆盖 `:root` 中的 CSS 变量
7. **响应式**：用 `@media (max-width: 768px)` 处理移动端适配

---

## 字体选择规则

根据设计文档中选定的视觉风格，选择对应字体组合：

| 风格方向 | 英文字体 | 中文字体 | CSS变量写法 |
|---------|---------|---------|-----------|
| 极简/企业感（S1/S2） | DM Sans | Noto Sans SC | `'DM Sans', 'Noto Sans SC', sans-serif` |
| 高端/衬线感（S8） | Playfair Display | Noto Serif SC | `'Playfair Display', 'Noto Serif SC', serif` |
| 中式雅韵（S10） | — | Noto Serif SC | `'Noto Serif SC', 'SimSun', serif` |
| 活力/年轻感（S9/S18 Y2K） | Plus Jakarta Sans | Noto Sans SC | `'Plus Jakarta Sans', 'Noto Sans SC', sans-serif` |
| 编辑/杂志感（S6/S3） | Cormorant Garamond | Noto Serif SC | `'Cormorant Garamond', 'Noto Serif SC', serif` |
| 粗野主义（S15） | Space Grotesk | Noto Sans SC | `'Space Grotesk', 'Noto Sans SC', sans-serif` |
| 科技暗黑（S4/S27） | Inter | Noto Sans SC | `'Inter', 'Noto Sans SC', sans-serif` |

字体 CDN 格式：
```html
<link href="https://fonts.loli.net/css2?family=[字体名]:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
<link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
```

中文降级栈：
```css
-apple-system, 'PingFang SC', 'Microsoft YaHei', sans-serif  /* 无衬线 */
'STSong', 'SimSun', serif  /* 衬线/宋体 */
```

---

## CSS 变量模板

每个页面的 `<style>` 中必须以 CSS 变量开头。**所有颜色值从设计文档填入，禁止使用占位颜色：**

```css
:root {
  /* 颜色 — 从设计文档[视觉定调]填入 */
  --color-primary: [从设计文档主色填入];
  --color-accent:  [从设计文档辅色填入];
  --color-bg:      [从设计文档背景色填入];
  --color-bg-dark: [从设计文档深色背景填入，可与primary相同];
  --color-text:    [从设计文档文字色填入，通常深色];
  --color-text-muted: [辅助文字色，比主文字色浅30%];
  --color-text-on-dark: rgba(255,255,255,0.95);
  --color-border:  rgba(0,0,0,0.08);

  /* 字体 — 根据上方字体选择规则填入 */
  --font-body:    [从字体选择规则填入];
  --font-display: [从字体选择规则填入，可与body相同];
}

@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:   [深色背景，通常 #111-#1a 之间];
    --color-text: [深色模式文字色，通常 #e0-#f0 之间];
    --color-text-muted: [深色模式辅助文字色];
    --color-border: rgba(255,255,255,0.08);
  }
}
```

---

## 导航栏模板

**注意：导航项名称和链接必须从设计文档页面清单填入，不得使用示例内容。**

```html
<nav class="nav">
  <div class="nav__inner">
    <a href="index.html" class="nav__brand">[品牌名 — 从设计文档填入]</a>
    <ul class="nav__links">
      <!-- 按设计文档页面清单逐项填入，示例：-->
      <li><a href="index.html">[首页导航文字]</a></li>
      <li><a href="[page-2].html">[第2页导航文字]</a></li>
      <li><a href="[page-3].html">[第3页导航文字]</a></li>
      <li><a href="[contact].html" class="nav__cta">[CTA文字 — 用行动导向语言]</a></li>
      <li><a href="#" class="nav__auth">登入/注册</a></li>
    </ul>
    <button class="nav__toggle" onclick="document.querySelector('.nav__mobile').classList.toggle('open')">
      <i class="fas fa-bars"></i>
    </button>
  </div>
  <div class="nav__mobile">
    <!-- 与上方保持一致 -->
  </div>
</nav>
```

---

## 页脚模板

```html
<footer class="footer">
  <div class="footer__inner">
    <p class="footer__brand">[品牌名] · [一句话定位 — 从商业定位文档填入]</p>
    <div class="footer__links">
      <!-- 与导航保持一致 -->
    </div>
    <p class="footer__copy">[版权信息或品牌标语]</p>
  </div>
</footer>
```

---

## 图片策略

### 优先级
1. 用户提供的真实素材（优先，按设计文档图片策略分配）
2. Unsplash 占位图（标注"需替换"）

### 使用方式
```html
<!-- 内容图片 -->
<img src="assets/photo.webp" alt="描述文字" loading="lazy" />

<!-- 装饰性背景 -->
<div class="hero" style="background-image: url('assets/hero.webp')"></div>
```

### 命名规范
`{页面}_{元素}_{编号/描述}.{ext}`，全小写+下划线，例如：
- `index_hero_bg.jpg`（首页 hero 背景）
- `about_avatar_2.png`（关于页第二张头像）
- `logo.png`（品牌 logo）

### 图片格式
- 优先使用 WebP（体积小、质量好）
- Logo/图标保持 PNG（支持透明）
- 大图最大宽度 1600px，方案截图 1200px，Logo 400px

---

## 交互功能选配菜单

**根据页面需求选配，不要全选。**

### 基础（所有项目必选）

```html
<script>
// 滚动渐入
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
</script>
```

配合 CSS：
```css
.reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
.reveal.visible { opacity: 1; transform: translateY(0); }
```

### 按需选配

**① 数字计数动画** — 有核心数据展示时选用

```html
<script>
function countUp(el, target, duration) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start);
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target, parseInt(entry.target.dataset.target), 1500);
      counterObserver.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('[data-target]').forEach(el => counterObserver.observe(el));
</script>
```

用法：`<span class="counter" data-target="200">0</span>`

**② FAQ 手风琴** — 有常见问题区块时选用

```html
<script>
document.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    item.classList.toggle('open');
  });
});
</script>
```

**③ 标签页切换** — 多产品线/多类别展示时选用

```html
<script>
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});
</script>
```

**④ 视差滚动** — S5摄影沉浸风格时选用

```html
<script>
window.addEventListener('scroll', () => {
  document.querySelectorAll('.parallax').forEach(el => {
    const speed = el.dataset.speed || 0.3;
    el.style.backgroundPositionY = `${window.scrollY * speed}px`;
  });
});
</script>
```

**⑤ 水平滚动** — 时间线/作品集展示时选用

```css
.scroll-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  padding: 1rem;
  scrollbar-width: thin;
}
.scroll-track > * { scroll-snap-align: start; flex-shrink: 0; }
```

**⑥ 平滑锚点滚动** — 单页落地页时选用

```css
html { scroll-behavior: smooth; }
```

**⑦ 图片 Lightbox** — 案例/作品展示需要放大查看时选用

```html
<script>
const lightbox = document.createElement('div');
lightbox.className = 'lightbox';
lightbox.innerHTML = '<img /><button onclick="this.parentElement.style.display=\'none\'">✕</button>';
document.body.appendChild(lightbox);
document.querySelectorAll('[data-lightbox]').forEach(img => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightbox.querySelector('img').src = img.src;
    lightbox.style.display = 'flex';
  });
});
lightbox.addEventListener('click', e => { if(e.target === lightbox) lightbox.style.display = 'none'; });
</script>
<style>
.lightbox { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.9); z-index:9999; align-items:center; justify-content:center; }
.lightbox img { max-width:90vw; max-height:90vh; object-fit:contain; }
.lightbox button { position:absolute; top:1rem; right:1rem; background:none; border:none; color:#fff; font-size:1.5rem; cursor:pointer; }
</style>
```

---

## 移动端导航

```css
.nav__toggle { display: none; }
.nav__mobile { display: none; }

@media (max-width: 768px) {
  .nav__links { display: none; }
  .nav__toggle { display: block; }
  .nav__mobile.open {
    display: flex; flex-direction: column;
    position: fixed; top: 60px; left: 0; right: 0; bottom: 0;
    background: var(--color-bg-dark);
    align-items: center; justify-content: center; gap: 2rem;
    z-index: 999;
  }
  .nav__mobile a {
    color: var(--color-text-on-dark);
    font-size: 1.5rem; text-decoration: none;
  }
}
```

---

## 页面模板（完整结构示例）

**注意：以下模板中所有 `[填入]` 占位符必须替换为实际内容，不得保留。**

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[页面标题] - [品牌名]</title>
  <meta name="description" content="[页面描述]" />
  
  <!-- 字体：根据字体选择规则填入 -->
  <link href="https://fonts.loli.net/css2?family=[英文字体]:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
  <!-- 图标 -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />

  <style>
    :root {
      /* 颜色：从设计文档填入，禁止使用占位颜色 */
      --color-primary: [主色];
      --color-accent:  [辅色];
      --color-bg:      [背景色];
      --color-bg-dark: [深色背景];
      --color-text:    [文字色];
      --color-text-muted: [辅助文字色];
      --color-text-on-dark: rgba(255,255,255,0.95);
      --color-border:  rgba(0,0,0,0.08);

      /* 字体：从字体选择规则填入 */
      --font-body:    [字体栈];
      --font-display: [标题字体栈];
    }

    @media (prefers-color-scheme: dark) {
      :root { /* 深色模式覆盖 */ }
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); }

    /* 导航栏样式 */
    /* Section 样式 */
    /* 页脚样式 */
    @media (max-width: 768px) { /* 移动端适配 */ }
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>

  <!-- 导航栏：导航项从设计文档页面清单填入 -->
  <nav class="nav">...</nav>

  <!-- 主内容：Section 顺序按设计文档规划 -->
  <main>
    <section class="hero">...</section>
    <!-- 更多 sections，顺序和布局模式见设计文档 -->
  </main>

  <!-- 页脚：与所有页面保持一致 -->
  <footer class="footer">...</footer>

  <!-- 交互脚本：按需选配，不要全选 -->
  <script>
    // 基础：滚动渐入（必选）
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 按需追加其他交互...
  </script>
</body>
</html>
```

---

## 质量检查清单

- [ ] 每个 HTML 文件双击可在浏览器中直接打开
- [ ] 导航栏在所有页面一致，链接互通，含「登入/注册」按钮
- [ ] 页脚一致
- [ ] **所有颜色通过 CSS 变量定义，无任何硬编码颜色字面量**
- [ ] **无任何 `[填入]` 占位符残留**
- [ ] 图片有 alt 文本和 loading="lazy"
- [ ] 深色模式正确适配
- [ ] 移动端响应式正常
- [ ] 无外部依赖（除字体和图标 CDN）
- [ ] 对比度 ≥ 4.5:1（WCAG AA）
- [ ] 语义化 HTML 标签
