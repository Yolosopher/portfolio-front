/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                hostname: "img-store-api.yolosopher.site",
            },
        ],
    },
};

export default nextConfig;
