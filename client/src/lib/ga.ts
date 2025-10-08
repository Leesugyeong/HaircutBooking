// src/lib/ga.ts
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export function initGA(measurementId: string) {
  if (window.gtag) return; // 중복 방지
  // 외부 스크립트 삽입
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(s);

  // gtag 초기화 (인라인 대신 JS 번들에서 수행 → CSP 'self'만으로 허용됨)
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId, { debug_mode: true }); // 디버그 뷰에도 보이게
}

export function pageview(path: string) {
  if (!window.gtag) return;
  window.gtag('event', 'page_view', { page_path: path });
}
