import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        hostname: "img-store-api.nika-nishnianidze.online",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
