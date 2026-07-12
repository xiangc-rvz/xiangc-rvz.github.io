"use client";

import { useState } from "react";
import Link from "next/link";

export default function GuestbookPage() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      // Replace YOUR_FORM_ID with your Formspree form ID (formspree.io/f/...)
      const res = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, message }),
      });
      if (res.ok) {
        setStatus("sent");
        setName("");
        setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    border: "1px solid black",
    padding: "6px 8px",
    fontFamily: "inherit",
    fontSize: "inherit",
    letterSpacing: "inherit",
    lineHeight: "inherit",
    background: "white",
    boxSizing: "border-box",
    outline: "none",
    borderRadius: 0,
    appearance: "none",
  };

  return (
    <main className="page">
      <section style={{ padding: "0 16px" }}>
        {/* Header row */}
        <header style={{ textAlign: "center" }}>
          <div className="columns" style={{ margin: 0, alignItems: "center" }}>
            <div className="column" style={{ padding: "0", border: "none" }}>
              <hr style={{ margin: 0, height: 1 }} />
            </div>
            <div
              className="column is-narrow"
              style={{ padding: "0 16px", border: "none", flexShrink: 0 }}
            >
              <h1 className="main-title" style={{ whiteSpace: "nowrap" }}>
                Leave a note
              </h1>
            </div>
            <div className="column" style={{ padding: "0", border: "none" }}>
              <hr style={{ margin: 0, height: 1 }} />
            </div>
          </div>
          <hr className="thick" style={{ margin: "16px 0" }} />
        </header>

        {/* Form */}
        <div style={{ maxWidth: 560, paddingTop: 24, paddingBottom: 64 }}>
          {status === "sent" ? (
            <p style={{ fontFamily: "CooperBTLight, Cambria, serif", fontSize: 28, lineHeight: "36px" }}>
              Thanks for leaving a note.{" "}
              <Link href="/" className="highlight">
                ← Back
              </Link>
            </p>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", marginBottom: 4 }}>Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", marginBottom: 4 }}>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Say something…"
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {status === "error" && (
                <p style={{ marginBottom: 12 }}>Something went wrong — try again.</p>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link href="/" className="highlight">
                  ← Back
                </Link>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  style={{
                    padding: "4px 20px",
                    border: "1px solid black",
                    background: "black",
                    color: "white",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    letterSpacing: "inherit",
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    transition: "background 0.2s ease, color 0.2s ease",
                    borderRadius: 0,
                  }}
                  onMouseEnter={(e) => {
                    if (status !== "sending") {
                      (e.currentTarget as HTMLButtonElement).style.background = "white";
                      (e.currentTarget as HTMLButtonElement).style.color = "black";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "black";
                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                  }}
                >
                  {status === "sending" ? "Sending…" : "Send"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
