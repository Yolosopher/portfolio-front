import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { BottomScrollProvider } from "@/context/bottomScrollContext";
import { ISetting } from "@/models/setting";

const LayoutInner = ({
  children,
  settings,
}: Readonly<{
  settings: ISetting;
  children: React.ReactNode;
}>) => {
  return (
    <BottomScrollProvider>
      <Header settings={settings} />
      <main className="pt-36 min-h-screen">{children}</main>
      <Footer settings={settings} />
    </BottomScrollProvider>
  );
};
export default LayoutInner;
