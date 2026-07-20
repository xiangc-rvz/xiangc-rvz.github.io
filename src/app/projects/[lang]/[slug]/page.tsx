import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProjectPageShell } from "@/components/ProjectPageShell";
import { getProject, projects, type ProjectLang } from "@/lib/projects";

type Params = {
  lang: string;
  slug: string;
};

export function generateStaticParams(): Params[] {
  const langs: ProjectLang[] = ["en", "cn"];
  return langs.flatMap((lang) =>
    projects.map((project) => ({
      lang,
      slug: project.slug,
    })),
  );
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then(({ lang, slug }) => {
    const project = getProject(slug);
    if (!project || (lang !== "en" && lang !== "cn")) {
      return { title: "Project — Xiang Chen" };
    }
    return {
      title: `${project[lang as ProjectLang].title} — Xiang Chen`,
      description: project[lang as ProjectLang].description,
    };
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { lang, slug } = await params;

  if (lang !== "en" && lang !== "cn") {
    notFound();
  }

  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  return <ProjectPageShell lang={lang} slug={slug} />;
}
