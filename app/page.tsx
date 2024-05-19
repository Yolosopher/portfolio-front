import { fetchSettings } from "@/actions/settings";
import { fetchTechs } from "@/actions/techs";
import Hero from "@/components/home/hero/hero";
import ScrollToBottom from "@/components/home/scroll-to-bottom/ScrollToBottom";
import HomeTechStack from "@/components/home/tech/HomeTechStack";

export default async function Home() {
  const settings = await fetchSettings();
  const techs = await fetchTechs();
  return (
    <>
      {/* scroller */}
      <ScrollToBottom />
      {/* content */}
      <Hero settings={settings.data} />
      <HomeTechStack techs={techs.data} />
    </>
  );
}
