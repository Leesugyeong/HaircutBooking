//import { createRoot } from "react-dom/client";
//import App from "./App";
//import "./index.css";

//createRoot(document.getElementById("root")!).render(<App />);

// src/main.tsx
import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { initGA, pageview } from './lib/ga'
import { useLocation } from 'wouter'

function Root() {
  const [location] = useLocation();

  useEffect(() => {
    initGA('G-8TMX2QMRGK'); // ✅ 여기서 초기화
  }, []);

  useEffect(() => {
    pageview(location);     // SPA 라우트 변경마다 page_view
  }, [location]);

  return <App />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><Root /></StrictMode>
)
