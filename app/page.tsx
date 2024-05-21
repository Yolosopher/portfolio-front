import { fetchProjects } from "@/actions/projects";
import { fetchSettings } from "@/actions/settings";
import { fetchTechs } from "@/actions/techs";
import Hero from "@/components/home/hero/hero";
import HomeProjects from "@/components/home/projects/HomeProjects";
import ScrollToSection from "@/components/home/scroll-to-section/ScrollToSection";
import HomeTechStack from "@/components/home/tech/HomeTechStack";
import { InViewProvider } from "@/context/inViewContext";

export default async function Home() {
  const settings = await fetchSettings();
  const techs = await fetchTechs();
  const projects = await fetchProjects();
  return (
    <InViewProvider>
      {/* content */}
      <Hero settings={settings.data} />
      <HomeTechStack techs={techs.data} />
      <HomeProjects projects={projects.data} />
      {/* scroller */}
      <ScrollToSection />
    </InViewProvider>
  );
}
