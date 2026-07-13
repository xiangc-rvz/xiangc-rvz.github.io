"use client";

import Image from "next/image";

export function SiteHeader() {
  return (
    <section style={{ padding: "0 16px" }}>
      {/* ── Top nav row ── */}
      <header style={{ textAlign: "center" }}>
        <div className="columns" style={{ margin: 0, alignItems: "center" }}>
          {/* Left: leave a note link */}
          <div className="column" style={{ padding: "0", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ whiteSpace: "nowrap", marginRight: 8 }}>
                <a href="/guestbook" className="highlight">Leave a note</a>
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
              Xiang Chen
            </h1>
          </div>

          {/* Right: line + nav */}
          <div className="column" style={{ padding: "0", border: "none" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
              <hr style={{ flex: 1, margin: 0, height: 1, marginRight: 8 }} />
              <span className="single-line" style={{ whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 8 }}>
                <a href="https://medium.com/@xccxrvz" className="highlight">
                  Medium
                </a>
                {" — "}
                <a href="https://www.linkedin.com/in/xiang-chen-a282642a6/" className="highlight">
                  LinkedIn
                </a>
                {" — "}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "2px 10px",
                    border: "1px solid black",
                    background: "black",
                    color: "white",
                    textDecoration: "none",
                    letterSpacing: "-0.2px",
                    lineHeight: "18px",
                    transition: "background 0.2s ease, color 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "white"; (e.currentTarget as HTMLAnchorElement).style.color = "black"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "black"; (e.currentTarget as HTMLAnchorElement).style.color = "white"; }}
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
          {/* Avatar — 25% width */}
          <div
            className="column undivided"
            style={{ flex: "0 0 25%", maxWidth: "25%", padding: "0 12px 0 0" }}
          >
            <div style={{ aspectRatio: "1/1", width: "100%" }}>
              <Image
                src="/images/avatar-1-1@2x.png"
                alt="Illustration of the author in the style of a Matt Groening character"
                width={488}
                height={488}
                style={{ borderRadius: "50%", width: "100%", height: "auto", display: "block" }}
                priority
              />
            </div>
          </div>

          {/* Bio — remaining 75% */}
          <div
            className="column undivided"
            style={{ padding: "0 0 0 12px", display: "flex", alignItems: "center" }}
          >
            <p className="profile-text">
              Xiang is a product designer, builder and thinker who goes deep
              where design meets AI. Trained in computational design at Carnegie
              Mellon, Xiang designs and ships AI products end-to-end — the kind
              that actually run in the real world. On a mission to make AI
              products that are genuinely useful, quietly delightful, and worth
              building in the first place.
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}
