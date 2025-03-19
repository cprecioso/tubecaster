import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    typedEnv: true,
  },
};

export default withVanillaExtract(nextConfig);
