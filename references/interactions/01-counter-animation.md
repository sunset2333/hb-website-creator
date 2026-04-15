# ① 数字计数动画

**适用场景**：有核心数据展示时选用

```jsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        let start = 0;
        const step = target / (1500 / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { start = target; clearInterval(timer); }
          el.textContent = Math.floor(start);
        }, 16);
        observer.unobserve(el);
      }
    });
  });
  document.querySelectorAll('[data-target]').forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, [page]);
```

用法：`<span data-target="200">0</span>`
