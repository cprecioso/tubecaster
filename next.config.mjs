import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: "auto" },
});

/** @type {import("next").NextConfig} */
const nextConfig = {
  typedRoutes: true,
  experimental: {
    typedEnv: true,
  },
};

export default withVanillaExtract(nextConfig);
