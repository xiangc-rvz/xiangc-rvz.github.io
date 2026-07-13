"use client";

import Image from "next/image";
import { useState } from "react";

type Lang = "en" | "cn";

const EN = {
  name: "Xiang Chen",
  leaveNote: "Leave a note",
  social: { label: "Medium", href: "https://medium.com/@xccxrvz" },
  resume: "/resume.pdf",
  bio: (
    <>
      Xiang is a product designer, builder and thinker who goes deep where
      design meets AI. Trained in computational design at Carnegie Mellon,
      Xiang designs and ships AI products end-to-end — the kind that actually
      run in the real world. On a mission to make AI products that are
      genuinely useful, quietly delightful, and worth building in the first
      place.
    </>
  ),
};

const CN = {
  name: "陈想",
  leaveNote: "留言",
  // TODO: replace "#" with your WeChat public account URL (公众号：管中试窥天地间)
  social: { label: "公众号", href: "#" },
  resume: "/resume-cn.pdf",
  bio: (
    <>
      陈想是一位产品设计师、创造者与思考者，专注于设计与 AI
      交汇的深水区。在卡内基梅隆大学接受计算设计训练，她端到端地设计并落地
      AI 产品——那种真正能在现实世界跑起来的产品。使命是做出真正有用、克制而令人愉悦，以及值得被做出来的
      AI 产品。
    </>
  ),
};

const btnBase: React.CSSProperties = {
  display: "inline-block",
  padding: "2px 10px",
  border: "1px solid black",
  fontFamily: "inherit",
  fontSize: "inherit",
  letterSpacing: "-0.2px",
  lineHeight: "18px",
  cursor: "pointer",
  transition: "background 0.2s ease, color 0.2s ease",
  borderRadius: 0,
  background: "black",
  color: "white",
  flexShrink: 0,
};

export function SiteHeader() {
  const [lang, setLang] = useState<Lang>("en");
  const t = lang === "en" ? EN : CN;
  const nextLang = lang === "en" ? "CN" : "EN";

  return (
    <section style={{ padding: "0 16px" }}>
      {/* ── Top nav row ── */}
      <header style={{ textAlign: "center" }}>
        <div className="columns" style={{ margin: 0, alignItems: "center" }}>
          {/* Left: EN/CN toggle + leave a note */}
          <div className="column" style={{ padding: "0", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                onClick={() => setLang(lang === "en" ? "cn" : "en")}
                style={btnBase}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "white";
                  (e.currentTarget as HTMLButtonElement).style.color = "black";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "black";
                  (e.currentTarget as HTMLButtonElement).style.color = "white";
                }}
              >
                {nextLang}
              </button>
              <span style={{ whiteSpace: "nowrap" }}>
                <a href="/guestbook" className="highlight">{t.leaveNote}</a>
              </span>
              <hr style={{ flex: 1, margin: 0, height: 1 }} />
            </div>
          </div>

          {/* Center: title */}
          <div
            className="column is-narrow"
            style={{ padding: "0 16px", border: "none", flexShrink: 0 }}
          >
            <h1 className="main-title" style={{ whiteSpace: "nowrap" }}>
              {t.name}
            </h1>
          </div>

          {/* Right: line + nav */}
          <div className="column" style={{ padding: "0", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <hr style={{ flex: 1, margin: 0, height: 1, marginRight: 8 }} />
              <span className="single-line" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
                <a href={t.social.href} className="highlight">{t.social.label}</a>
                {" — "}
                <a href="https://www.linkedin.com/in/xiang-chen-a282642a6/" className="highlight">
                  LinkedIn
                </a>
                {" — "}
                <a
                  href={t.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ ...btnBase, textDecoration: "none" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "white";
                    (e.currentTarget as HTMLAnchorElement).style.color = "black";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.background = "black";
                    (e.currentTarget as HTMLAnchorElement).style.color = "white";
                  }}
                >
                  Resume
                </a>
              </span>
            </div>
          </div>
        </div>

        {/* Thick separator */}
        <hr className="thick" style={{ margin: "16px 0" }} />
      </header>

      {/* ── Profile ── */}
      <article id="profile" className="grayscale-hover">
        <div className="columns" style={{ margin: 0, alignItems: "stretch" }}>
          {/* Avatar */}
          <div
            className="column undivided"
            style={{ flex: "0 0 25%", maxWidth: "25%", padding: "0 12px 0 0" }}
          >
            <div style={{ aspectRatio: "1/1", width: "100%" }}>
              <Image
                src="/images/avatar-1-1@2x.png"
                alt="Xiang Chen"
                width={488}
                height={488}
                style={{ borderRadius: "50%", width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          </div>

          {/* Bio */}
          <div
            className="column undivided"
            style={{ padding: "0 0 0 12px", display: "flex", alignItems: "center" }}
          >
            <p className="profile-text">{t.bio}</p>
          </div>
        </div>
      </article>
    </section>
  );
}
