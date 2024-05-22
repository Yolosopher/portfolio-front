const ExperienceLayout = ({
  children,
  experiences,
}: Readonly<{
  children: React.ReactNode;
  experiences: React.ReactNode;
}>) => {
  return (
    <>
      {experiences}
      {children}
    </>
  );
};
export default ExperienceLayout;
