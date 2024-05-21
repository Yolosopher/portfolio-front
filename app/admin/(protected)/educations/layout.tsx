const EducationLayout = ({
  children,
  educations,
}: Readonly<{
  children: React.ReactNode;
  educations: React.ReactNode;
}>) => {
  return (
    <>
      {educations}
      {children}
    </>
  );
};
export default EducationLayout;
