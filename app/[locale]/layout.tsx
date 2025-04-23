import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import LayoutInner from "./LayoutInner";
import { cn } from "@/lib/utils";
import { fetchSettings } from "@/actions/settings";
import { dmSans } from "@/lib/fonts";
import CONFIG from "@/config";
import Metrics from "@/components/metrics/Metrics";
import AnimatedCursor from "react-animated-cursor";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/toaster";

const fullName = "Nika Nishnianidze (Yolosopher)";

const md = {
    title: "Yolosopher - Portfolio",
    description: `Explore the portfolio of ${fullName}, an experienced web developer specializing in creating stunning, responsive websites. View projects, skills, and contact information.`,
    icons: {
        icon: "/favicon.ico",
        apple: "/favicon/apple-touch-icon.png",
        shortcut: "/favicon/apple-touch-icon.png",
    },
    applicationName: "nika-nishnianidze.online",
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
    metadataBase: new URL("https://nika-nishnianidze.online"),
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
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();
    const { data } = await fetchSettings();

    return (
        <html lang={locale}>
            <body className={cn(dmSans.className, "bg-background")}>
                <Toaster />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    // disableTransitionOnChange
                >
                    {/* <AnimatedCursor color="109, 40, 217" innerSize={13} outerSize={20} /> */}
                    <LayoutInner messages={messages} settings={data}>
                        {children}
                    </LayoutInner>
                    {/* metrics */}
                </ThemeProvider>
                <Metrics />
            </body>
        </html>
    );
}
