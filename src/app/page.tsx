import { SiteHeader } from "@/components/SiteHeader";
import { ArticlesSection } from "@/components/ArticlesSection";
import { DesignSection } from "@/components/DesignSection";
import { DribbbleSection } from "@/components/DribbbleSection";
import { SiteFooter } from "@/components/SiteFooter";

export default function Home() {
  return (
    <main className="page">
      <SiteHeader />
      <ArticlesSection />
      <DesignSection />
      <DribbbleSection />
      <SiteFooter />
    </main>
  );
}
