const { withSentryConfig } = require("@sentry/nextjs");

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
});

/**
 * @type {import("next").NextConfig}
 */
const nextConfig = withMDX({
  sentry: {
    hideSourceMaps: false,
    widenClientFileUpload: true,
    transpileClientSDK: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: true,
  pageExtensions: ["ts", "tsx", "mdx"],
});

module.exports = withSentryConfig(nextConfig, { silent: true });
