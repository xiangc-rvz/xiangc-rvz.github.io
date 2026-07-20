"use client";

import { LangProvider } from "@/lib/lang";
import { SiteHeader } from "@/components/SiteHeader";
import { ProjectSection } from "@/components/ProjectSection";
import { DesignSection } from "@/components/DesignSection";
import { DribbbleSection } from "@/components/DribbbleSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <LangProvider>
      <main className="page">
        <SiteHeader />
        <ProjectSection />
        <DesignSection />
        <DribbbleSection />
        <SiteFooter />
      </main>
    </LangProvider>
  );
}
