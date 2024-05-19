const TechLayout = ({
  children,
  techs,
}: Readonly<{
  children: React.ReactNode;
  techs: React.ReactNode;
}>) => {
  return (
    <>
      {techs}
      {children}
    </>
  );
};
export default TechLayout;
