import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutInner from "./LayoutInner";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/actions/settings";
import { dmSans } from "@/lib/fonts";
import Metrics from "@/components/metrics/Metrics";
const fullName = "Nika Nishnianidze (Yolosopher)";
<meta
  name="description"
  content="Explore the portfolio of Nika Nishnianidze (Yolosopher), an experienced web developer specializing in creating stunning, responsive websites. View projects, skills, and contact information."
/>;

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
      <body className={cn(dmSans.className, "bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          // disableTransitionOnChange
        >
          <LayoutInner settings={data}>{children}</LayoutInner>
        </ThemeProvider>
        {/* metrics */}
        <Metrics />
      </body>
    </html>
  );
}
