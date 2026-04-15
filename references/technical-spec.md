# 技术规范

## ⚠️ 使用前必读

**每次生成新项目前，执行以下检查：**
1. 在设计文档中确认色彩方案（主色/辅色/背景色/文字色），填入 CSS 变量，**禁止使用本文档中任何示例颜色值**
2. 在设计文档中确认页面清单和导航项名称，**禁止复用任何示例导航内容**
3. 根据视觉风格选择字体组合（见下方字体选择规则）
4. 根据页面需求选配 React 交互模式（见下方交互菜单，不要全选）
5. 从 `assets/template/` 复制 `index.html`、`package.json`、`package-lock.json`、`vite.config.js`、`mock/page-client-toolkit.jsx` 到工作目录；`huoban/widget.jsx`、`huoban/style.less`、`huoban/component.json`、`main.jsx` 从头编写

如在输出代码中发现任何占位示例值（`[填入]` 字样）原封不动出现，视为错误，必须重新生成。

---

## 技术栈

**React + Less (site-widget 架构)**，所有页面组件集中在 `widget.jsx` 中，通过 URL 参数路由。样式写在 `style.less` 中，作用域锁定在 `.site-widget` 选择器下。

- 本地预览：`npm install && npm run dev`（Vite 开发服务器，端口 3000）
- 伙伴云部署：同一套代码直接上传，平台注入真实 `props`
- 不使用任何 UI 框架（Bootstrap、Tailwind、Ant Design 等）

---

## 文件结构

```
site-name/
├── huoban/                      ← ⭐ 上传到伙伴云的全部文件都在这里
│   ├── widget.jsx               ← 粘贴到伙伴云「编辑脚本 (JS)」
│   ├── style.less               ← 粘贴到伙伴云「编辑样式 (CSS)」
│   ├── component.json           ← 组件配置说明（media keys + custom_setting）
│   └── assets/                  ← 图片（上传到伙伴云「上传素材」）
├── main.jsx                     ← 本地开发入口（import from ./huoban/widget.jsx）
├── index.html                   ← 本地开发 HTML
├── package.json
├── vite.config.js
└── mock/
    └── page-client-toolkit.jsx  ← 伙伴云 SDK 本地模拟
```

资源文件命名：`{page}_{element}_{descriptor}.{ext}`，全部小写，只用字母/数字/下划线，例如：`index_hero_bg.jpg`、`about_avatar_2.png`

---

## 组件架构规则

1. **所有页面写在 `widget.jsx` 中**，每个页面为独立函数组件（如 `HomePage`、`AboutPage`），由主 `Widget` 组件通过 URL 参数 `?page=xxx` 路由
2. **样式写在 `style.less`**，不使用外部 `.css` 文件，全部嵌套在 `.site-widget` 下
3. **交互逻辑用 React hooks**：`useState` 管理 UI 状态，`useEffect` 处理副作用（动画、滚动监听等）
4. **Navbar 通过 `createCustomMountPointPortal` 渲染**，实现在伙伴云中的固定定位
5. **页脚作为共享组件**，在所有页面路由中都渲染
6. **页面间导航使用 `navigate()` 函数**，更新 `?page=` URL 参数并切换页面状态

---

## 核心原则

1. **语义化 JSX**：在 JSX 中使用语义化 HTML 元素（`<header>`、`<nav>`、`<main>`、`<section>`、`<footer>`、`<article>`）
2. **所有颜色通过 CSS 变量管理**：在 `.site-widget` 中定义，**禁止在具体选择器中硬编码任何颜色字面量**
3. **图片通过 `props.media` 引用**：JSX 中用 `props?.media?.key_name`，Less 中用 `var(--media-key_name)`；图片文件放在 `huoban/assets/`，在 `main.jsx` 中声明映射
4. **图标统一使用 `Icon` 组件**：`import { HBUI } from '@huoban/page-client-toolkit'; const { Icon } = HBUI;` → `<Icon size="base" fontSource="fa" type="xxx" theme="solid" />`
5. **字体动态注入**：在 `widget.jsx` 顶层用 `document.createElement('link')` 注入 CDN 字体，本地预览和伙伴云均生效（见字体选择规则）
6. **深色模式**：用 `@media (prefers-color-scheme: dark) { .site-widget { ... } }` 覆盖 CSS 变量
7. **响应式**：用容器查询 `@container site-widget (max-width: 768px)` 处理移动端，配合 `props.env.is_mobile` 处理 JS 层面的移动端逻辑

---

## 字体选择规则

根据设计文档中选定的视觉风格，选择对应字体组合：

| 风格方向 | 英文字体 | 中文字体 | CSS变量写法 |
|---------|---------|---------|-----------|
| 极简/企业感（S1/S2） | DM Sans | Noto Sans SC | `'DM Sans', 'Noto Sans SC', -apple-system, 'PingFang SC', sans-serif` |
| 高端/衬线感（S8） | Playfair Display | Noto Serif SC | `'Playfair Display', 'Noto Serif SC', 'STSong', 'SimSun', serif` |
| 中式雅韵（S10） | — | Noto Serif SC | `'Noto Serif SC', 'STSong', 'SimSun', serif` |
| 活力/年轻感（S9/S18 Y2K） | Plus Jakarta Sans | Noto Sans SC | `'Plus Jakarta Sans', 'Noto Sans SC', -apple-system, 'PingFang SC', sans-serif` |
| 编辑/杂志感（S6/S3） | Cormorant Garamond | Noto Serif SC | `'Cormorant Garamond', 'Noto Serif SC', 'STSong', 'SimSun', serif` |
| 粗野主义（S15） | Space Grotesk | Noto Sans SC | `'Space Grotesk', 'Noto Sans SC', -apple-system, 'PingFang SC', sans-serif` |
| 科技暗黑（S4/S27） | Inter | Noto Sans SC | `'Inter', 'Noto Sans SC', -apple-system, 'PingFang SC', sans-serif` |

字体动态注入格式（放在 `widget.jsx` 顶层，所有组件定义之前）：

```js
// 字体加载 — 本地预览和伙伴云均生效
const fontUrl = 'https://fonts.loli.net/css2?family=[英文字体名]:wght@400;500;700;900&family=Noto+Sans+SC:wght@300;400;500;700;900&display=swap';
if (typeof document !== 'undefined' && !document.querySelector(`link[href="${fontUrl}"]`)) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = fontUrl;
  document.head.appendChild(link);
}
```

中式雅韵（S10）无英文字体，只需加载中文字体：
```js
const fontUrl = 'https://fonts.loli.net/css2?family=Noto+Serif+SC:wght@300;400;500;700;900&display=swap';
```

---

## CSS 变量模板

变量定义在 `.site-widget` 中（不是 `:root`）。**所有颜色值从设计文档填入，禁止使用占位颜色。**

```less
.site-widget {
  /* 颜色 — 从设计文档[视觉定调]填入 */
  --color-primary:       [从设计文档主色填入];
  --color-accent:        [从设计文档辅色填入];
  --color-bg:            [从设计文档背景色填入];
  --color-bg-dark:       [深色背景，可与primary相同];
  --color-text:          [文字色，通常深色];
  --color-text-muted:    [辅助文字色，比主文字色浅30%];
  --color-text-on-dark:  rgba(255,255,255,0.95);
  --color-border:        rgba(0,0,0,0.08);

  /* 字体 — 根据上方字体选择规则填入（含系统字体降级） */
  --font-body:    [字体栈];
  --font-display: [标题字体栈];

  /* 容器查询上下文 */
  container-type: inline-size;
  container-name: site-widget;

  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
}

@media (prefers-color-scheme: dark) {
  .site-widget {
    --color-bg:          [深色背景，通常 #111-#1a 之间];
    --color-text:        [深色模式文字色，通常 #e0-#f0 之间];
    --color-text-muted:  [深色模式辅助文字色];
    --color-border:      rgba(255,255,255,0.08);
  }
}
```

---

## 排版与尺寸规范

以下变量统一放入 `.site-widget {}` 块内，与颜色/字体变量并列声明。

```less
/* 字号层级 — clamp() 响应式，上限防大字报 */
--text-hero:    clamp(2rem, 5vw, 3.25rem);          /* Hero 主标题，max 52px */
--text-h1:      clamp(1.75rem, 4vw, 2.5rem);         /* 页面标题，max 40px */
--text-h2:      clamp(1.5rem, 3vw, 2rem);             /* Section 标题，max 32px */
--text-h3:      clamp(1.125rem, 2vw, 1.5rem);         /* 子标题，max 24px */
--text-body:    clamp(0.9375rem, 1.2vw, 1.0625rem);   /* 正文 15-17px */
--text-sm:      clamp(0.8125rem, 1vw, 0.875rem);      /* 辅助文字 13-14px */
--text-xs:      0.75rem;                               /* 标签/注释 12px */

/* 行高 */
--leading-tight:   1.2;    /* 标题 */
--leading-snug:    1.4;    /* 副标题/短文案 */
--leading-normal:  1.6;    /* 中文正文 */
--leading-relaxed: 1.8;    /* 长段落 */

/* 容器最大宽度 */
--max-w-page:    1200px;   /* 整站内容区 */
--max-w-text:    720px;    /* 纯文字段落 */
--max-w-hero:    800px;    /* Hero 文字块，防止标题铺满全屏 */

/* 间距（8px 基准） */
--space-1:  0.5rem;   /* 8px */
--space-2:  1rem;     /* 16px */
--space-3:  1.5rem;   /* 24px */
--space-4:  2rem;     /* 32px */
--space-6:  3rem;     /* 48px */
--space-8:  4rem;     /* 64px */
--space-12: 6rem;     /* 96px */
--space-16: 8rem;     /* 128px */
```

**使用规则（强制）**：

- Hero 标题必须用 `font-size: var(--text-hero)`，h1 用 `--text-h1`，以此类推——**禁止硬编码 `font-size` 超过 `1rem`**
- 内容容器必须设置 `max-width: var(--max-w-page); margin: 0 auto`
- Hero 文字块（标题 + 副标题 + CTA 的包裹容器）必须设置 `max-width: var(--max-w-hero)`
- Section 的 `padding` 必须从间距 scale 中选取（如 `var(--space-12) 0`），**禁止使用任意数值**

---

## 导航栏组件

**注意：导航项名称和路由必须从设计文档页面清单填入，不得使用示例内容。**

```jsx
function Navbar({ page, navigate, props }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo" onClick={() => navigate('home')}>
          {/* 如有 logo 图片：<img src={props?.media?.logo} alt="[品牌名]" /> */}
          <span className="logo-text">[品牌名 — 从设计文档填入]</span>
        </div>
        <div className="nav-links">
          {/* 按设计文档页面清单填入 */}
          <a className={page === 'home' ? 'active' : ''} onClick={() => navigate('home')}>[首页文字]</a>
          <a className={page === 'about' ? 'active' : ''} onClick={() => navigate('about')}>[关于文字]</a>
          <button className="nav-cta btn btn-primary" onClick={() => openURL({ type: 'url', url: props?.custom_setting?.cta_link, openNewTab: false })}>
            [CTA文字 — 用行动导向语言]
          </button>
          <button className="nav-auth" onClick={() => openURL({ type: 'url', url: props?.custom_setting?.login_link, openNewTab: false })}>
            登入/注册
          </button>
        </div>
        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon type={menuOpen ? 'xmark' : 'bars'} fontSource="fa" theme="solid" size="base" />
        </button>
      </div>
      {menuOpen && (
        <div className="nav-mobile">
          {/* 与 nav-links 保持一致 */}
        </div>
      )}
    </nav>
  );
}
```

在主 `Widget` 组件中通过 Portal 渲染：
```jsx
{createCustomMountPointPortal(
  <Navbar page={page} navigate={navigate} props={props} />
)}
```

> ⚠️ **不要**在 `createCustomMountPointPortal` 内再包一层 `<div className="site-widget">`。  
> 原因：mock 环境下 portal 以内联方式渲染，多余的 `.site-widget` 有 `min-height: 100vh`，会撑出一整屏空白把 hero 推到视口外。生产环境 portal 渲染到平台控制的独立挂载点，同样不需要这层包裹。

---

## 页脚组件

```jsx
function Footer({ navigate, props }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">[品牌名] · [一句话定位 — 从商业定位文档填入]</p>
        <div className="footer-links">
          {/* 与导航保持一致 */}
          <a onClick={() => navigate('home')}>[首页]</a>
        </div>
        <p className="footer-copy">[版权信息或品牌标语]</p>
      </div>
    </footer>
  );
}
```

---

## 图片策略

### 资源命名与存放
- 所有图片放在 `assets/` 目录（扁平结构，无子目录）
- 文件名：`{页面}_{元素}_{编号/描述}.{ext}`，全小写+下划线，例如：
  - `index_hero_bg.jpg`（首页 hero 背景）
  - `about_avatar_2.png`（关于页第二张头像）
  - `logo.png`（品牌 logo）

### 在 `main.jsx` 中声明映射

图片放 `public/assets/`，用 `import.meta.env.BASE_URL` 作前缀，本地开发和子路径部署均正确：

```js
const I = import.meta.env.BASE_URL + 'assets/';
const media = {
  index_hero_bg: I + 'index_hero_bg.jpg',
  about_avatar_2: I + 'about_avatar_2.png',
  logo: I + 'logo.png',
};
```

### 在 JSX 中引用
```jsx
<img src={props?.media?.about_avatar_2} alt="描述文字" loading="lazy" />
<div className="hero-bg" style={{ backgroundImage: `url(${props?.media?.index_hero_bg})` }} />
```

### 在 Less 中引用
```less
.hero {
  background-image: var(--media-index_hero_bg);
}
```

### 图片格式
- 优先使用 WebP（体积小、质量好）
- Logo/图标保持 PNG（支持透明）
- 大图最大宽度 1600px，方案截图 1200px，Logo 400px

---

## 交互功能选配菜单

**根据页面需求选配，不要全选。完整代码在 `references/interactions/` 目录，需要时按需读取。**

| # | 名称 | 适用场景 | 文件 |
|---|------|---------|------|
| 必选 | 滚动渐入 | 所有项目，`.fade-up` 元素进入视口时渐入 | [00-scroll-fade.md](interactions/00-scroll-fade.md) |
| ① | 数字计数动画 | 有核心数字/数据展示区块时 | [01-counter-animation.md](interactions/01-counter-animation.md) |
| ② | FAQ 手风琴 | 有常见问题区块时 | [02-faq-accordion.md](interactions/02-faq-accordion.md) |
| ③ | 标签页切换 | 多产品线/多类别展示时 | [03-tab-switch.md](interactions/03-tab-switch.md) |
| ④ | 视差滚动 | S5 摄影沉浸风格时 | [04-parallax-scroll.md](interactions/04-parallax-scroll.md) |
| ⑤ | 水平滚动 | 时间线/作品集横向展示时 | [05-horizontal-scroll.md](interactions/05-horizontal-scroll.md) |
| ⑥ | 平滑滚动到锚点 | 单页落地页内部跳转时 | [06-smooth-scroll.md](interactions/06-smooth-scroll.md) |
| ⑦ | 图片 Lightbox | 案例/作品展示需要放大查看时 | [07-image-lightbox.md](interactions/07-image-lightbox.md) |

---

## 移动端导航

```less
.site-widget {
  .nav-toggle { display: none; }
  .nav-mobile { display: none; }
}

@container site-widget (max-width: 768px) {
  .site-widget {
    .nav-links { display: none; }
    .nav-toggle {
      display: block;
    }
    .nav-mobile {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 64px;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--color-bg-dark);
      align-items: center;
      justify-content: center;
      gap: 2rem;
      z-index: 999;
      a {
        color: var(--color-text-on-dark);
        font-size: 1.5rem;
      }
    }
  }
}
```

---

## 完整代码模板

从 `assets/template/` 复制 `index.html`、`package.json`、`package-lock.json`、`vite.config.js`、`mock/page-client-toolkit.jsx` 到工作目录（原样复制，不修改）。

以下文件从头编写：
- `huoban/widget.jsx` — 主组件（`import './style.less'` 路径保持相对）
- `huoban/style.less` — 样式
- `huoban/component.json` — 组件配置（media keys + custom_setting schema）
- `huoban/assets/` — 图片放这里（`publicDir: 'huoban'` 让 Vite 自动以 `/assets/` 路径提供服务并复制到 dist）
- `main.jsx` — 本地开发入口，`import Widget from './huoban/widget.jsx'`

编写规则：
- 颜色变量 → 从设计文档填入 CSS 变量块
- 字体注入 → 按字体选择规则写入 fontUrl
- 导航项/品牌名 → 从设计文档页面清单填入
- 页面组件 → 按设计文档 Section 规划逐页编写
- 图片映射 → 在 `main.jsx` 的 `media` 对象中声明（路径用 `import.meta.env.BASE_URL + 'assets/'`）
- 链接配置 → 在 `main.jsx` 的 `custom_setting` 对象中配置

**⚠️ 所有 `[填入]` 占位符必须替换为实际内容，不得保留。**

---

## 质量检查清单

- [ ] `npm run dev` 启动后页面在浏览器中正确渲染
- [ ] Navbar 组件在所有页面路由中一致显示，含「登入/注册」按钮
- [ ] **所有颜色通过 `.site-widget` 下的 CSS 变量定义，无任何硬编码颜色字面量**
- [ ] **无任何 `[填入]` 占位符残留**
- [ ] `main.jsx` 中 `media` 映射与 `assets/` 文件一一对应
- [ ] 外部链接通过 `openURL` + `props.custom_setting` 处理
- [ ] 容器查询响应式正常（`@container site-widget` 断点生效）
- [ ] 图标使用 `Icon` 组件（无 `<i class="fas">` 标签）
- [ ] 深色模式 CSS 变量覆盖正确
- [ ] 字体通过动态注入加载，本地和伙伴云字体显示一致
- [ ] 滚动渐入（`.fade-up`）在页面切换后重新绑定（`useEffect` 依赖 `page`）
- [ ] 每页 CTA ≥ 2 个，文案用第一人称行动导向
- [ ] 对比度 ≥ 4.5:1（WCAG AA）
- [ ] 语义化 HTML 元素
