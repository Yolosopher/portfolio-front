import { fetchProjects } from "@/actions/projects";

const Projects = async () => {
  const { data } = await fetchProjects();
  return <div className="">Projects</div>;
};
export default Projects;
