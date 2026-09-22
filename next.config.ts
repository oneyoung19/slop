import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = "slop";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.0.40.232"],
  output: "export",
  basePath: isGithubActions ? `/${repoName}` : "",
  assetPrefix: isGithubActions ? `/${repoName}/` : "",
  env: { NEXT_PUBLIC_BASE_PATH: isGithubActions ? `/${repoName}` : "" },
};

export default nextConfig;
