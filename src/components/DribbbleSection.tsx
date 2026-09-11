"use client";

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

const shots: Shot[] = [
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

  return (
    <section className="creative-home-section" style={{ padding: "0 16px" }}>
      <hr className="double" />

      {/* Section heading */}
      <div className="section-heading">
        <span className="creative-section-square" aria-hidden="true" />
        <h2>{heading}</h2>
      </div>

      {/* 3-column grid */}
      <div className="columns" style={{ alignItems: "flex-start" }}>
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
              id={shot.kind === "project" ? projectAnchorId(shot.slug) : undefined}
              className="column grayscale-hover"
            >
              {shot.kind === "project" ? (
                <Link
                  href={href}
                  style={{ display: "block", color: "inherit", textDecoration: "none" }}
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
                <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
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
    </section>
  );
}
