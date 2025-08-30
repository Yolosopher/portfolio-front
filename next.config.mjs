import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    productionBrowserSourceMaps: false,
    images: {
        remotePatterns: [
            {
                hostname: "img-store-api.nika-nishnianidze.online",
            },
        ],
    },
    eslint: {
        // Skip ESLint during production builds to speed up CI
        ignoreDuringBuilds: true,
    },
    typescript: {
        // CI can set NEXT_DISABLE_TYPECHECK=1 to skip type checking on build
        ignoreBuildErrors: true,
    },
};

export default withNextIntl(nextConfig);
