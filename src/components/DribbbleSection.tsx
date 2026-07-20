"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { projectHref } from "@/lib/projects";

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
    kind: "external",
    title: "Pop-Up Shop Live",
    image: "/images/dribbble-stop-asian-hate-16-9@2x.png",
    imageAlt:
      "Vector illustration of discarded bowl of chicken wings and rice left on the sidewalk",
    link: "https://dribbble.com/shots/15518575-Pop-Up-Shop-Live",
    ctaEn: "View on Dribbble",
    ctaCn: "在 Dribbble 查看",
  },
  {
    kind: "external",
    title: "Numbers",
    image: "/images/dribbble-numbers-16-9@2x.png",
    imageAlt: "Digits zero through nine in a bubbly but slim font",
    link: "https://dribbble.com/shots/10869796-Numbers",
    ctaEn: "View on Dribbble",
    ctaCn: "在 Dribbble 查看",
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
        {shots.map((shot, i) => {
          const href =
            shot.kind === "project" ? projectHref(lang, shot.slug) : shot.link;
          const cta = lang === "en" ? shot.ctaEn : shot.ctaCn;
          const padding =
            i === 0 ? "0 12px 0 0" : i === shots.length - 1 ? "0 0 0 12px" : "0 12px";

          return (
            <article
              key={shot.title}
              className="column grayscale-hover"
              style={{ padding }}
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
