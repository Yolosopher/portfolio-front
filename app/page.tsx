import { fetchSettings } from "@/actions/settings";
import Hero from "@/components/home/hero/hero";

export default async function Home() {
  const { data } = await fetchSettings();
  return (
    <>
      <Hero settings={data} />
    </>
  );
}
