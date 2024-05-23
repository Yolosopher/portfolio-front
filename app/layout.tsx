import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutInner from "./LayoutInner";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/actions/settings";
import { dmSans } from "@/lib/fonts";
import { GoogleTagManager } from "@next/third-parties/google";
import CONFIG from "@/config";

const fullName = "Nika Nishnianidze (Yolosopher)";

const md = {
  title: "Yolosopher - Portfolio",
  description: `Explore the portfolio of ${fullName}, an experienced web developer specializing in creating stunning, responsive websites. View projects, skills, and contact information.`,
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/apple-touch-icon.png",
  },
  applicationName: "yolosopher.online",
  creator: fullName,
  keywords: [
    "web developer",
    "web development portfolio",
    "portfolio",
    "front-end developer",
    "back-end developer",
    "full-stack developer",
    "mern stack developer",
    "pern stack developer",
    "web development projects",
    "nextjs",
    "reactjs",
    "nodejs",
    "node.js",
    "expressjs",
    "Nika Nishnianidze",
    "Yolosopher",
  ],
};
export const metadata: Metadata = {
  title: md.title,
  description: md.description,
  icons: md.icons,
  applicationName: md.applicationName,
  creator: md.creator,
  metadataBase: new URL("https://yolosopher.online"),
  openGraph: {
    title: md.title,
    description: md.description,
    images: "/preview.png",
  },
  manifest: "/favicon/site.webmanifest",
  keywords: md.keywords,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await fetchSettings();
  return (
    <html lang="en">
      <GoogleTagManager gtmId={CONFIG.google_tag_id} />
      <body className={cn(dmSans.className, "bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // disableTransitionOnChange
        >
          <LayoutInner settings={data}>{children}</LayoutInner>
        </ThemeProvider>
        {/* metrics */}

        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${CONFIG.google_tag_id}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* <Metrics /> */}
      </body>
    </html>
  );
}
