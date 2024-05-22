import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutInner from "./LayoutInner";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/actions/settings";
import { dmSans } from "@/lib/fonts";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const fullName = "Nika Nishnianidze (Yolosopher)";
const md = {
  title: "Yolosopher - Portfolio",
  description: `Portfolio website for ${fullName}`,
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/apple-touch-icon.png",
  },
  applicationName: "yolosopher.online",
  creator: fullName,
};
export const metadata: Metadata = {
  title: md.title,
  description: md.description,
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/apple-touch-icon.png",
  },
  applicationName: "yolosopher.online",
  creator: fullName,
  metadataBase: new URL("https://yolosopher.online"),
  openGraph: {
    title: md.title,
    description: md.description,
    images: "/preview.png",
  },
  manifest: "/favicon/site.webmanifest",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleAnalyticsId = process.env.GOOGLE_ANALYTICS_ID;
  const { data } = await fetchSettings();
  return (
    <html lang="en">
      <body className={cn(dmSans.className, "bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // disableTransitionOnChange
        >
          <LayoutInner settings={data}>{children}</LayoutInner>
        </ThemeProvider>
      </body>
      {googleAnalyticsId && (
        <>
          <GoogleTagManager gtmId={googleAnalyticsId} />
        </>
      )}
    </html>
  );
}
