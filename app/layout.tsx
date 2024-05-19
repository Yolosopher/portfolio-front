import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutInner from "./LayoutInner";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/actions/settings";
import { dmSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Yolosopher - Portfolio",
  description: "Portfolio website for Yolosopher",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
    shortcut: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
      </body>
    </html>
  );
}
