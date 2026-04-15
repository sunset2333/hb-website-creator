# ② FAQ 手风琴

**适用场景**：有常见问题区块时选用

```jsx
const [openFaq, setOpenFaq] = useState(null);

// JSX:
<div className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
  <div className="faq-q" onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
    {item.question}
  </div>
  <div className="faq-a">{item.answer}</div>
</div>
```
