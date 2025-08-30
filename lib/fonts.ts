import localFont from "next/font/local";

export const poppins = localFont({
    src: [
        {
            path: "../public/fonts/Poppins-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/Poppins-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/Poppins-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/Poppins-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
    preload: true,
});

export const dmSans = localFont({
    src: [
        {
            path: "../public/fonts/DMSans-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../public/fonts/DMSans-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../public/fonts/DMSans-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../public/fonts/DMSans-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
    display: "swap",
    preload: true,
});
