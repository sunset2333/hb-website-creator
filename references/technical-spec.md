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

**纯静态 HTML 单文件架构**，整个网站只有一个 `index.html`，内联 CSS（`<style>` 标签）和 JS（`<script>` 标签）。不使用任何框架（React、Vue、Angular、Bootstrap、Tailwind 等），不生成独立的 `.css` 或 `.js` 文件。

`index.html` 是**完全自包含**的——双击即可在浏览器中打开，也支持 Claude Code 右侧预览面板直接预览。

---

## 文件结构

```
site/
├── index.html          ← 唯一的 HTML 文件（包含所有页面）
└── assets/             ← 图片等静态资源
```

**无论单页还是多页网站，都只生成一个 `index.html`。** 多页通过 hash 路由切换。

---

## HTML 架构规则

1. **整个网站是一个 `index.html` 文件**，包含完整的 `<!DOCTYPE html>`、`<head>`、`<body>`
2. **CSS 内联在 `<style>` 标签中**，位于 `<head>` 内。**禁止生成独立 `.css` 文件**
3. **JS 内联在 `<script>` 标签中**，位于 `</body>` 前。**禁止生成独立 `.js` 文件**
4. **使用 CSS class 组织样式**（如 `.hero`, `.card`, `.features`），保持代码干净精简
5. **多页网站用 hash 路由**：每个「页面」是 `<div class="page" id="page-xxx">`，导航用 `<a href="#xxx">`

### 多页 hash 路由规则

```html
<!-- 导航链接 -->
<a href="#home">首页</a>
<a href="#about">关于</a>

<!-- 页面容器 -->
<div class="page active" id="page-home">
  <section class="hero">...</section>
  <section class="features">...</section>
</div>
<div class="page" id="page-about">
  <section class="about-hero">...</section>
</div>

<!-- 路由 CSS -->
<style>
.page { display: none; }
.page.active { display: block; }
</style>

<!-- 路由 JS -->
<script>
function router() {
  const hash = location.hash.slice(1) || 'home';
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const target = document.getElementById('page-' + hash);
  if (target) {
    target.classList.add('active');
    window.scrollTo(0, 0);
  }
  // 更新导航激活状态
  document.querySelectorAll('.nav__links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + hash);
  });
}
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
</script>
```

- 导航栏和页脚**只写一次**，放在所有 `.page` 容器的外面（全局共享）
- 单页网站不需要路由，直接用锚点滚动即可

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

**注意：导航项名称和链接必须从设计文档页面清单填入，不得使用示例内容。多页网站使用 hash 链接。**

**禁止折叠/汉堡菜单**：移动端导航必须平铺显示所有导航项，不使用 hamburger icon 或抽屉菜单。

```html
<nav class="nav">
  <div class="nav__inner">
    <a href="#home" class="nav__brand">[品牌名 — 从设计文档填入]</a>
    <ul class="nav__links">
      <!-- 按设计文档页面清单逐项填入，使用 hash 链接 -->
      <li><a href="#home">[首页导航文字]</a></li>
      <li><a href="#[page-2]">[第2页导航文字]</a></li>
      <li><a href="#[page-3]">[第3页导航文字]</a></li>
      <li><a href="#[contact]" class="nav__cta">[CTA文字 — 用行动导向语言]</a></li>
      <li><a href="#" class="nav__auth">登入/注册</a></li>
    </ul>
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

## 移动端适配规范

### 导航栏（平铺，禁止折叠）

移动端导航**必须平铺显示所有导航项**，禁止使用 hamburger 菜单、抽屉菜单、折叠面板等隐藏式导航。

```css
/* 桌面端：水平排列 */
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
.nav__links {
  display: flex;
  list-style: none;
  gap: 1.5rem;
  align-items: center;
}

/* 移动端：品牌名居中或靠左，导航项换行平铺 */
@media (max-width: 768px) {
  .nav__inner {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
  }
  .nav__brand {
    width: 100%;
    text-align: center;
  }
  .nav__links {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 1rem;
  }
  .nav__links a {
    font-size: 0.85rem;
    padding: 0.35rem 0.6rem;
  }
}
```

如果导航项超过 5 个，移动端使用水平滚动条：
```css
@media (max-width: 768px) {
  .nav__links {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* 隐藏滚动条 */
    padding-bottom: 0.25rem;
  }
  .nav__links::-webkit-scrollbar { display: none; }
  .nav__links li { flex-shrink: 0; }
}
```

### 布局适配规则

```css
@media (max-width: 768px) {
  /* 多列布局降为单列 */
  .grid-2col, .grid-3col, .grid-4col {
    grid-template-columns: 1fr;
  }

  /* 图文并排改为上下堆叠 */
  .split-layout {
    flex-direction: column;
  }

  /* 标题字号缩放 */
  h1 { font-size: clamp(1.75rem, 6vw, 3rem); }
  h2 { font-size: clamp(1.35rem, 4vw, 2.25rem); }

  /* Section 内边距缩小 */
  section { padding: 3rem 1rem; }

  /* Hero 区高度适配 */
  .hero { min-height: 80vh; padding: 4rem 1rem 3rem; }

  /* 按钮全宽 */
  .btn { width: 100%; text-align: center; }

  /* 卡片间距缩小 */
  .card-grid { gap: 1rem; }

  /* 隐藏纯装饰元素 */
  .decorative { display: none; }
}
```

### 触控友好

- 所有可点击元素最小尺寸 **44×44px**（WCAG 2.5.5）
- 按钮和链接之间最小间距 **8px**，防止误触
- 输入框高度 ≥ **48px**

---

## 页面模板（完整结构示例）

**注意：以下模板中所有 `[填入]` 占位符必须替换为实际内容，不得保留。**

### 单页网站模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[品牌名] - [一句话定位]</title>
  <meta name="description" content="[页面描述]" />
  
  <!-- 字体：根据字体选择规则填入 -->
  <link href="https://fonts.loli.net/css2?family=[英文字体]:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
  <!-- 图标 -->
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />

  <style>
    :root {
      --color-primary: [主色];
      --color-accent:  [辅色];
      --color-bg:      [背景色];
      --color-bg-dark: [深色背景];
      --color-text:    [文字色];
      --color-text-muted: [辅助文字色];
      --color-text-on-dark: rgba(255,255,255,0.95);
      --color-border:  rgba(0,0,0,0.08);
      --font-body:    [字体栈];
      --font-display: [标题字体栈];
    }

    @media (prefers-color-scheme: dark) {
      :root { /* 深色模式覆盖 */ }
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); }

    /* 导航栏、Section、页脚等样式用 class 组织 */
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>
  <nav class="nav">...</nav>
  <main>
    <section class="hero" id="hero">...</section>
    <!-- 更多 sections -->
  </main>
  <footer class="footer">...</footer>

  <script>
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>
```

### 多页网站模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>[品牌名] - [一句话定位]</title>
  <meta name="description" content="[页面描述]" />
  
  <link href="https://fonts.loli.net/css2?family=[英文字体]:wght@400;500;700;800;900&display=swap" rel="stylesheet" />
  <link href="https://fonts.loli.net/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" rel="stylesheet" />

  <style>
    :root {
      --color-primary: [主色];
      --color-accent:  [辅色];
      --color-bg:      [背景色];
      --color-bg-dark: [深色背景];
      --color-text:    [文字色];
      --color-text-muted: [辅助文字色];
      --color-text-on-dark: rgba(255,255,255,0.95);
      --color-border:  rgba(0,0,0,0.08);
      --font-body:    [字体栈];
      --font-display: [标题字体栈];
    }

    @media (prefers-color-scheme: dark) {
      :root { /* 深色模式覆盖 */ }
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-body); background: var(--color-bg); color: var(--color-text); }

    /* 路由：页面显隐 */
    .page { display: none; }
    .page.active { display: block; }

    /* 导航栏、Section、页脚等样式用 class 组织 */
    .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
    .reveal.visible { opacity: 1; transform: translateY(0); }
  </style>
</head>
<body>

  <!-- 导航栏（全局共享，只写一次） -->
  <nav class="nav">
    <div class="nav__inner">
      <a href="#home" class="nav__brand">[品牌名]</a>
      <ul class="nav__links">
        <li><a href="#home">[首页]</a></li>
        <li><a href="#about">[关于]</a></li>
        <li><a href="#contact" class="nav__cta">[CTA文字]</a></li>
        <li><a href="#" class="nav__auth">登入/注册</a></li>
      </ul>
    </div>
  </nav>

  <!-- 页面区块 -->
  <div class="page active" id="page-home">
    <section class="hero">...</section>
    <section class="features">...</section>
  </div>

  <div class="page" id="page-about">
    <section class="about-hero">...</section>
  </div>

  <div class="page" id="page-contact">
    <section class="contact-form">...</section>
  </div>

  <!-- 页脚（全局共享，只写一次） -->
  <footer class="footer">...</footer>

  <script>
    // Hash 路由
    function router() {
      const hash = location.hash.slice(1) || 'home';
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('page-' + hash);
      if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
      }
      document.querySelectorAll('.nav__links a[href^="#"]').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + hash);
      });
    }
    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', router);

    // 滚动渐入
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  </script>
</body>
</html>
```

---

## 质量检查清单

- [ ] 只有一个 `index.html` 文件，无独立 `.css` 或 `.js` 文件
- [ ] `index.html` 双击可在浏览器中直接打开
- [ ] 支持 Claude Code preview 工具预览
- [ ] 多页网站 hash 路由正常工作，默认显示首页
- [ ] 导航栏 hash 链接与页面容器 id 匹配，含「登入/注册」按钮
- [ ] 页脚正常显示
- [ ] **所有颜色通过 CSS 变量定义，无任何硬编码颜色字面量**（`:root` 定义除外）
- [ ] **无任何 `[填入]` 占位符残留**
- [ ] 样式用 CSS class 组织，代码干净精简
- [ ] 图片有 alt 文本和 loading="lazy"
- [ ] 深色模式正确适配
- [ ] 移动端响应式正常
- [ ] 无外部依赖（除字体和图标 CDN）
- [ ] 对比度 ≥ 4.5:1（WCAG AA）
- [ ] 语义化 HTML 标签
