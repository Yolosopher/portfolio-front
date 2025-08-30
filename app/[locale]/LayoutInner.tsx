import LinkToAdmin from "@/components/admin-link/LinkToAdmin";
import Footer from "@/components/shared/footer/Footer";
import Header from "@/components/shared/header/Header";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import PAGE_SCROLL_ID from "@/config/page-scroll-id";
import { ISetting } from "@/models/setting";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import MessagePopup from "./MessagePopup";

const LayoutInner = ({
    children,
    settings,
    messages,
}: Readonly<{
    settings: ISetting;
    children: React.ReactNode;
    messages: AbstractIntlMessages;
}>) => {
    return (
        <>
            <MessagePopup
                uniqueId="not-fully-translated"
                variant="destructive"
                title="Hi, visitor!"
                description={
                    "The database entries haven't been translated yet, so only the static content is available in Georgian."
                }
            />
            <NextIntlClientProvider messages={messages}>
                <div className="scrollContainer h-[100dvh]">
                    <ScrollArea className="h-full" viewportId={PAGE_SCROLL_ID}>
                        <ScrollBar
                            className="z-20 relative"
                            thumbColor="primary"
                        />
                        <Header settings={settings} />
                        <main className="pt-24 min-h-screen">{children}</main>
                        <Footer settings={settings} />
                        <LinkToAdmin />
                    </ScrollArea>
                </div>
            </NextIntlClientProvider>
        </>
    );
};
export default LayoutInner;
