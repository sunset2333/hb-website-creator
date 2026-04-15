# ⑥ 平滑滚动到锚点

**适用场景**：单页落地页内部跳转时选用

```jsx
const scrollTo = (id) => {
  // ⚠️ 伙伴云滚动容器是 #main-wrapper-scroll，不是 window
  const scrollEl = document.getElementById('main-wrapper-scroll') || window;
  const target = document.getElementById(id);
  if (!target) return;
  const offset = target.offsetTop - 80;
  if (scrollEl === window) window.scrollTo({ top: offset, behavior: 'smooth' });
  else scrollEl.scrollTo({ top: offset, behavior: 'smooth' });
};
```
