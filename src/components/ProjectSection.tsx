"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/lang";
import { homeProjects, projectHref } from "@/lib/projects";

export function ProjectSection() {
  const { lang } = useLang();
  const heading = lang === "en" ? "Project" : "项目";
  const cta = lang === "en" ? "View project" : "查看项目";

  return (
    <section className="project-home-section" style={{ padding: "0 16px" }}>
      <hr className="double" />

      <div className="section-heading">
        <span className="project-section-square" aria-hidden="true" />
        <h2>{heading}</h2>
      </div>

      <div className="columns" style={{ alignItems: "flex-start" }}>
        {homeProjects.map((project, i) => {
          const copy = project[lang];
          const href = projectHref(lang, project.slug);
          return (
            <article
              key={project.slug}
              className="column grayscale-hover"
              style={{
                padding:
                  i === 0
                    ? "0 12px 0 0"
                    : i === homeProjects.length - 1
                      ? "0 0 0 12px"
                      : "0 12px",
              }}
            >
              <Link href={href} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  width={648}
                  height={365}
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
                <h3 className="article-title">{copy.title}</h3>
                <p style={{ marginBottom: 0 }}>{copy.description}</p>
              </Link>
              <div className="external-link">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icons/arrow-circle-up-right-fill.svg" alt="" className="icon-24" />
                <Link href={href} className="highlight">
                  {cta}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
