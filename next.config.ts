import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./libs/i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/es",
        permanent: true,
      },
      {
        source: "/games/:id",
        destination: "/es/games/:id",
        permanent: true,
      },
      {
        source: "/collaborators/:id",
        destination: "/es/collaborators/:id",
        permanent: true,
      },
      {
        source: "/devblogs",
        destination: "/es/devblogs",
        permanent: true,
      },
      {
        source: "/devblogs/:slug",
        destination: "/es/devblogs/:slug",
        permanent: true,
      },
      {
        source: "/join",
        destination: "/es/join",
        permanent: true,
      },
      {
        source: "/links",
        destination: "/es/links",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
