"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeProjectTags } from "@/components/HomeProjectTags";
import { useLang } from "@/lib/lang";
import { getProject, projectAnchorId, projectHref } from "@/lib/projects";

type Shot =
  | {
      kind: "external";
      title: string;
      image: string;
      imageAlt: string;
      link: string;
      ctaEn: string;
      ctaCn: string;
    }
  | {
      kind: "project";
      slug: string;
      title: string;
      image: string;
      imageAlt: string;
      ctaEn: string;
      ctaCn: string;
    };

const VISIBLE = 3;

const shots: Shot[] = [
  {
    kind: "project",
    slug: "artiverse",
    title: "Artiverse",
    image: "/images/artiverse-cover.png",
    imageAlt:
      "Artiverse cover — diverse creators looking up at linked landscape and painting windows on a pink ground",
    ctaEn: "View project",
    ctaCn: "查看项目",
  },
  {
    kind: "project",
    slug: "vr-chord",
    title: "VR Chord",
    image: "/images/vr-chord-cover.png",
    imageAlt: "VR Chord — reimagining typing in virtual reality",
    ctaEn: "View project",
    ctaCn: "查看项目",
  },
  {
    kind: "project",
    slug: "pass-that-there",
    title: "Pass That There",
    image: "/images/pass-that-there-cover.png",
    imageAlt:
      "Pass That There — collaborative XR interaction techniques for handing objects between users",
    ctaEn: "View project",
    ctaCn: "查看项目",
  },
  {
    kind: "project",
    slug: "crazy-baby-alarm",
    title: "Crazy Baby Alarm",
    image: "/images/crazy-baby-alarm-cover.png",
    imageAlt:
      "Concept sketch of Crazy Baby Alarm — a star-faced wheeled robot alarm with camera, LED, and display",
    ctaEn: "View project",
    ctaCn: "查看项目",
  },
];

export function DribbbleSection() {
  const { lang } = useLang();
  const heading = lang === "en" ? "Creative Practice" : "创作实践";
  const [start, setStart] = useState(0);
  const maxStart = Math.max(0, shots.length - VISIBLE);
  const canPrev = start > 0;
  const canNext = start < maxStart;

  return (
    <section className="creative-home-section" style={{ padding: "0 16px" }}>
      <hr className="double" />

      <div className="section-heading creative-carousel-heading">
        <span className="creative-section-square" aria-hidden="true" />
        <h2>{heading}</h2>
        <div className="creative-carousel-nav" role="group" aria-label="Creative projects">
          <button
            type="button"
            className="creative-carousel-btn"
            aria-label={lang === "en" ? "Previous projects" : "上一个项目"}
            disabled={!canPrev}
            onClick={() => setStart((s) => Math.max(0, s - 1))}
          >
            ←
          </button>
          <button
            type="button"
            className="creative-carousel-btn"
            aria-label={lang === "en" ? "Next projects" : "下一个项目"}
            disabled={!canNext}
            onClick={() => setStart((s) => Math.min(maxStart, s + 1))}
          >
            →
          </button>
        </div>
      </div>

      <div className="creative-carousel">
        <div className="creative-carousel-viewport">
          <div
            className="creative-carousel-track"
            style={{ transform: `translateX(-${(start * 100) / VISIBLE}%)` }}
          >
            {shots.map((shot) => {
              const href =
                shot.kind === "project" ? projectHref(lang, shot.slug) : shot.link;
              const cta = lang === "en" ? shot.ctaEn : shot.ctaCn;
              const tags =
                shot.kind === "project"
                  ? getProject(shot.slug)?.[lang].tags
                  : undefined;

              return (
                <article
                  key={shot.title}
                  id={
                    shot.kind === "project"
                      ? projectAnchorId(shot.slug)
                      : undefined
                  }
                  className="creative-carousel-item grayscale-hover"
                >
                  {shot.kind === "project" ? (
                    <Link
                      href={href}
                      style={{
                        display: "block",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <Image
                        src={shot.image}
                        alt={shot.imageAlt}
                        width={648}
                        height={365}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <h3 className="article-title">{shot.title}</h3>
                    </Link>
                  ) : (
                    <>
                      <Image
                        src={shot.image}
                        alt={shot.imageAlt}
                        width={648}
                        height={365}
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <h3 className="article-title">{shot.title}</h3>
                    </>
                  )}
                  <HomeProjectTags tags={tags} />
                  <div className="external-link">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/icons/arrow-circle-up-right-fill.svg"
                      alt=""
                      className="icon-24"
                    />
                    {shot.kind === "project" ? (
                      <Link href={href} className="highlight">
                        {cta}
                      </Link>
                    ) : (
                      <a href={href} className="highlight">
                        {cta}
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
