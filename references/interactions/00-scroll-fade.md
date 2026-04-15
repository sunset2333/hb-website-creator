# 滚动渐入（所有项目必选）

**适用场景**：所有项目，`page` 变化时重新绑定

```jsx
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
  return () => observer.disconnect();
}, [page]);
```

配合 Less（已在模板中）：
```less
.fade-up {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
}
```
