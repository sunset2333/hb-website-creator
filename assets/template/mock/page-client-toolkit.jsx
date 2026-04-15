import React from 'react';

// ===== Load FontAwesome =====
const faUrl = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';
if (typeof document !== 'undefined' && !document.querySelector(`link[href="${faUrl}"]`)) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = faUrl;
  document.head.appendChild(link);
}

// ===== Icon Component =====
const sizeMap = { min: '16px', small: '20px', base: '24px', middle: '32px', large: '36px', max: '48px', biggest: '96px' };
const themeMap = { solid: 'fas', brand: 'fab' };

function Icon({ type, size = 'base', theme = 'solid', color }) {
  const style = { fontSize: sizeMap[size] || '24px' };
  if (color) style.color = `var(--${color})`;
  return <i className={`${themeMap[theme] || 'fas'} fa-${type}`} style={style} />;
}

export const HBUI = { Icon };

// ===== openURL =====
export function openURL({ type = 'url', url, openNewTab = false }) {
  if (openNewTab) window.open(url, '_blank', 'noopener,noreferrer');
  else window.location.href = url;
}

// ===== createCustomMountPointPortal =====
// 生产环境（伙伴云）：平台将内容渲染到 widget 外部的独立挂载点。
// 本地 mock / 独立部署：直接内联渲染——Navbar 是 position:fixed 不影响文档流，
// 且保持在 .site-widget 内部确保 CSS 选择器正常生效。
// 重要：调用处不要包 <div className="site-widget">，否则 min-height:100vh 会撑出空白。
export function createCustomMountPointPortal(component) {
  return component;
}
