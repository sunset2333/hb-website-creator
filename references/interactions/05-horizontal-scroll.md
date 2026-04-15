# ⑤ 水平滚动

**适用场景**：时间线/作品集展示时选用

```less
.scroll-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  gap: 1.5rem;
  padding: 1rem;
  scrollbar-width: thin;
  > * {
    scroll-snap-align: start;
    flex-shrink: 0;
  }
}
```
