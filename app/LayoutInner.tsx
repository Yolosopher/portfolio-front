import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ISetting } from "@/models/setting";

const LayoutInner = ({
  children,
  settings,
}: Readonly<{
  settings: ISetting;
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Header settings={settings} />
      <main className="pt-36 min-h-screen">{children}</main>
      <Footer settings={settings} />
    </>
  );
};
export default LayoutInner;
