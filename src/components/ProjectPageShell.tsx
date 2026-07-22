"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getProject,
  projectHref,
  type ContentBlock,
  type ProjectLang,
  type ProjectSection,
} from "@/lib/projects";

type Props = {
  lang: ProjectLang;
  slug: string;
};

function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "paragraph") {
          return (
            <p key={i} className="project-body-text">
              {block.text}
            </p>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={i} className="project-intro-quote">
              <p>{block.text}</p>
            </blockquote>
          );
        }

        if (block.type === "numbered") {
          return (
            <ol
              key={i}
              className="project-numbered-list"
              start={block.start ?? 1}
            >
              {block.items.map((item, j) => (
                <li key={j}>
                  <strong>{item.title}</strong>
                  <p>{item.body}</p>
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "image") {
          const isAnimated = block.src.endsWith(".gif");
          const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(block.src);
          const layoutClass =
            block.layout === "phone"
              ? " project-inline-figure--phone"
              : block.layout === "medium"
                ? " project-inline-figure--medium"
                : "";
          return (
            <figure key={i} className={`project-inline-figure${layoutClass}`}>
              {isVideo ? (
                <video
                  src={block.src}
                  width={block.width}
                  height={block.height}
                  autoPlay={!block.controls}
                  loop={block.loop ?? !block.controls}
                  muted={!block.controls}
                  controls={block.controls}
                  playsInline
                  aria-label={block.alt}
                />
              ) : (
                <Image
                  src={block.src}
                  alt={block.alt}
                  width={block.width}
                  height={block.height}
                  unoptimized={isAnimated}
                />
              )}
              {block.caption ? (
                <figcaption className="project-inline-caption">{block.caption}</figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "mediaRow") {
          return (
            <figure key={i} className="project-media-row-wrap">
              <div className="project-media-row">
                {block.items.map((item, j) => {
                  const isAnimated = item.src.endsWith(".gif");
                  const isVideo = /\.(mp4|webm|mov)(\?|$)/i.test(item.src);
                  return (
                    <div key={j} className="project-media-row-item">
                      {isVideo ? (
                        <video
                          src={item.src}
                          width={item.width}
                          height={item.height}
                          autoPlay
                          loop
                          muted
                          playsInline
                          aria-label={item.alt}
                        />
                      ) : (
                        <Image
                          src={item.src}
                          alt={item.alt}
                          width={item.width}
                          height={item.height}
                          unoptimized={isAnimated}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
              {block.caption ? (
                <figcaption className="project-inline-caption">{block.caption}</figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === "table") {
          return (
            <div key={i} className="project-table-wrap">
              <table className="project-table">
                <thead>
                  <tr>
                    {block.headers.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        if (block.type === "code") {
          return (
            <div key={i} className="project-code-block">
              {block.label ? (
                <p className="project-code-label">{block.label}</p>
              ) : null}
              <pre>
                <code>{block.text}</code>
              </pre>
            </div>
          );
        }

        return (
          <ul key={i} className="project-bullet-list">
            {block.items.map((item, j) => (
              <li key={j}>{item}</li>
            ))}
          </ul>
        );
      })}
    </>
  );
}

function SectionBlock({ section }: { section: ProjectSection }) {
  return (
    <section
      id={section.id}
      className={`project-section-block${section.level === 2 ? " is-sub" : ""}`}
    >
      <h2
        className={`project-section-title${
          section.level === 2 ? " project-heading-level-2" : ""
        }`}
      >
        {section.title}
      </h2>
      <ContentBlocks blocks={section.blocks} />
    </section>
  );
}

export function ProjectPageShell({ lang, slug }: Props) {
  const project = getProject(slug);
  const [navVisible, setNavVisible] = useState(false);

  const firstSectionId = project?.[lang].sections[0]?.id ?? "";

  useEffect(() => {
    function updateNavVisibility() {
      if (!firstSectionId) {
        setNavVisible(false);
        return;
      }

      const firstHeading = document.getElementById(firstSectionId);
      if (!firstHeading) {
        setNavVisible(false);
        return;
      }

      const top = firstHeading.getBoundingClientRect().top;
      setNavVisible(top <= 120);
    }

    updateNavVisibility();
    window.addEventListener("scroll", updateNavVisibility, { passive: true });
    window.addEventListener("resize", updateNavVisibility);
    return () => {
      window.removeEventListener("scroll", updateNavVisibility);
      window.removeEventListener("resize", updateNavVisibility);
    };
  }, [firstSectionId, slug]);

  if (!project) return null;

  const copy = project[lang];
  const otherLang: ProjectLang = lang === "en" ? "cn" : "en";
  const name = lang === "en" ? "Xiang Chen" : "陈想";
  const backLabel = lang === "en" ? "PROJECTS" : "项目";
  const switchLabel = otherLang.toUpperCase();

  const homeLabel = lang === "en" ? "← Home" : "← 首页";

  return (
    <div className="project-page">
      <Link
        href="/"
        className={`project-home-button${navVisible ? " is-hidden" : ""}`}
      >
        {homeLabel}
      </Link>

      <header className="project-topbar">
        <Link
          href={lang === "en" ? "/resume.pdf" : "/resume-cn.pdf"}
          className={`project-name-link${navVisible ? " is-collapsed" : ""}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </Link>
        <span
          className={`project-name-square${navVisible ? " is-visible" : ""}`}
          aria-hidden="true"
        />
      </header>

      <aside
        className={`project-sidebar${navVisible ? " is-visible" : ""}`}
        aria-hidden={!navVisible}
      >
        <div className="project-sidebar-inner">
          <Link href="/" className="project-sidebar-brand">
            <span className="project-brand-square" aria-hidden="true" />
            {backLabel}
          </Link>

          <nav className="project-toc" aria-label={lang === "en" ? "Contents" : "目录"}>
            <ul>
              {copy.sections.map((section) => (
                <li key={section.id} className={`project-toc-level-${section.level}`}>
                  <a href={`#${section.id}`}>
                    <span className="project-toc-number">{section.number}</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      <main className="project-main">
        <header className="project-header">
          <h1 className="project-title">{copy.title}</h1>
          <p className="project-subtitle">{copy.description}</p>
          {copy.tags && copy.tags.length > 0 && (
            <div className="project-tags">
              <span className="project-tags-label">
                {lang === "en" ? "Tags:" : "标签："}
              </span>
              <ul className="project-tags-list">
                {copy.tags.map((tag) => (
                  <li key={tag} className="project-tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <hr className="double" />
          <figure className="project-cover">
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={648}
              height={365}
              priority
            />
          </figure>
          <Link href={projectHref(otherLang, slug)} className="project-language-link">
            {switchLabel}
          </Link>
        </header>

        {copy.sections.map((section) => (
          <SectionBlock key={section.id} section={section} />
        ))}
      </main>

      <p className="project-copyright">Copyright &copy; 2025 Xiang Chen</p>
    </div>
  );
}
