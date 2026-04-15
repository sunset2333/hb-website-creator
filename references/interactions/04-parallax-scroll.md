# ④ 视差滚动

**适用场景**：S5 摄影沉浸风格时选用

```jsx
useEffect(() => {
  // ⚠️ 伙伴云滚动容器是 #main-wrapper-scroll，不是 window
  const scrollEl = document.getElementById('main-wrapper-scroll') || window;
  const handleScroll = () => {
    const scrollY = scrollEl === window ? window.scrollY : scrollEl.scrollTop;
    document.querySelectorAll('.parallax').forEach(el => {
      const speed = el.dataset.speed || 0.3;
      el.style.backgroundPositionY = `${scrollY * speed}px`;
    });
  };
  scrollEl.addEventListener('scroll', handleScroll);
  return () => scrollEl.removeEventListener('scroll', handleScroll);
}, []);
```
