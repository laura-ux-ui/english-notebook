"use client";

import { useEffect, useState } from "react";
import type { Chapter } from "@/lib/chapters";

const STORAGE_KEY = "english-notebook:last-chapter";

export default function Notebook({ chapters }: { chapters: Chapter[] }) {
  const [current, setCurrent] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Restaura el último capítulo visto.
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const idx = chapters.findIndex((c) => c.slug === saved);
      if (idx >= 0) setCurrent(idx);
    }
  }, [chapters]);

  // Guarda el capítulo actual.
  useEffect(() => {
    if (chapters[current]) {
      localStorage.setItem(STORAGE_KEY, chapters[current].slug);
    }
  }, [current, chapters]);

  // Navegación con teclado.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function goTo(idx: number) {
    if (idx < 0 || idx >= chapters.length) return;
    setCurrent(idx);
    setSidebarOpen(false);
  }

  if (chapters.length === 0) {
    return (
      <div className="empty-state">
        <h1>No hay capítulos todavía</h1>
        <p>
          Sube archivos HTML a <code>public/chapters/</code> y aparecerán aquí.
        </p>
      </div>
    );
  }

  const chapter = chapters[current];

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-head">
          <div className="brand">English Notebook</div>
          <div className="brand-sub">Laura</div>
        </div>
        <nav className="chapter-list">
          {chapters.map((c, i) => (
            <button
              key={c.slug}
              className={`chapter-link ${i === current ? "active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="chapter-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="chapter-title">{c.title}</span>
            </button>
          ))}
        </nav>
      </aside>

      {sidebarOpen && (
        <div className="backdrop" onClick={() => setSidebarOpen(false)} />
      )}

      <main className="content">
        <header className="topbar">
          <button
            className="menu-btn"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Abrir menú"
          >
            ☰
          </button>
          <div className="current-title">{chapter.title}</div>
          <div className="nav-controls">
            <button
              className="nav-btn"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
            >
              ← Anterior
            </button>
            <span className="counter">
              {current + 1} / {chapters.length}
            </span>
            <button
              className="nav-btn"
              onClick={() => goTo(current + 1)}
              disabled={current === chapters.length - 1}
            >
              Siguiente →
            </button>
          </div>
        </header>

        <iframe
          key={chapter.slug}
          className="viewer"
          src={`/chapters/${chapter.file}`}
          title={chapter.title}
        />
      </main>
    </div>
  );
}
