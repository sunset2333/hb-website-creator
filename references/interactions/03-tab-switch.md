# ③ 标签页切换

**适用场景**：多产品线/多类别展示时选用

```jsx
const [activeTab, setActiveTab] = useState(0);

// JSX:
<div className="tabs">
  {tabs.map((tab, i) => (
    <button key={i} className={`tab-btn ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
      {tab.label}
    </button>
  ))}
</div>
<div className="tab-panel">{tabs[activeTab].content}</div>
```
