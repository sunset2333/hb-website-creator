# ⑦ 图片 Lightbox

**适用场景**：案例/作品展示需要放大查看时选用

```jsx
const [lightboxSrc, setLightboxSrc] = useState(null);

// JSX:
{lightboxSrc && (
  <div className="lightbox" onClick={() => setLightboxSrc(null)}>
    <img src={lightboxSrc} onClick={e => e.stopPropagation()} />
    <button onClick={() => setLightboxSrc(null)}>✕</button>
  </div>
)}
// 触发：<img src={props?.media?.xxx} onClick={() => setLightboxSrc(props?.media?.xxx)} style={{cursor:'zoom-in'}} />
```

配合 Less：
```less
.lightbox {
  display: flex;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  align-items: center;
  justify-content: center;
  img {
    max-width: 90vw;
    max-height: 90vh;
    object-fit: contain;
  }
  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
```
