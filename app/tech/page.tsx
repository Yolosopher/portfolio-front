import { fetchTechs } from "@/actions/techs";

const Tech = async () => {
  const { data } = await fetchTechs();
  return <div className="">Tech</div>;
};
export default Tech;
