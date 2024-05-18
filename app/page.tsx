import Hero from "@/components/home/hero/hero";
import { fetchSettings } from "./layout";

export default async function Home() {
  const { data } = await fetchSettings();
  return (
    <>
      <Hero settings={data} />
    </>
  );
}
