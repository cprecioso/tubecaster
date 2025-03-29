import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import("next").NextConfig} */
const nextConfig = {
  experimental: {
    typedEnv: true,
    typedRoutes: true,
  },
};

export default withVanillaExtract(nextConfig);
