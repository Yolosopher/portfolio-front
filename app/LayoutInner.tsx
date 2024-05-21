import LinkToAdmin from "@/components/admin-link/LinkToAdmin";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PAGE_SCROLL_ID from "@/config/page-scroll-id";
import { ISetting } from "@/models/setting";

const LayoutInner = ({
  children,
  settings,
}: Readonly<{
  settings: ISetting;
  children: React.ReactNode;
}>) => {
  return (
    <div className="scrollContainer h-[100dvh]">
      <ScrollArea className="h-full" viewportId={PAGE_SCROLL_ID}>
        <ScrollBar className="z-20 relative" thumbColor="primary" />
        <Header settings={settings} />
        <main className="pt-24 min-h-screen">{children}</main>
        <Footer settings={settings} />
        <LinkToAdmin />
      </ScrollArea>
    </div>
  );
};
export default LayoutInner;
