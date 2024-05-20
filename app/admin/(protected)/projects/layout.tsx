const ProjectsLayout = ({
  children,
  projects,
}: Readonly<{
  children: React.ReactNode;
  projects: React.ReactNode;
}>) => {
  return (
    <>
      {projects}
      {children}
    </>
  );
};
export default ProjectsLayout;
