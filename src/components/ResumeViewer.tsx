"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  backLabel: string;
  pages: { src: string; width: number; height: number; alt: string }[];
};

export function ResumeViewer({ title, backLabel, pages }: Props) {
  return (
    <main className="resume-viewer-page">
      <header className="resume-viewer-bar">
        <Link href="/" className="highlight">
          {backLabel}
        </Link>
        <h1 className="resume-viewer-title">{title}</h1>
        <span aria-hidden="true" />
      </header>
      <div
        className="resume-viewer-pages"
        onContextMenu={(e) => e.preventDefault()}
      >
        {pages.map((page) => (
          <figure key={page.src} className="resume-viewer-page-figure">
            <Image
              src={page.src}
              alt={page.alt}
              width={page.width}
              height={page.height}
              className="resume-viewer-page-image"
              priority
              unoptimized
            />
          </figure>
        ))}
      </div>
    </main>
  );
}
