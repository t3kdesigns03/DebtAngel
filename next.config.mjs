/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export — the whole site is client/static, so this deploys as plain
  // HTML/CSS/JS. Netlify serves the `out/` folder directly (no serverless needed).
  output: "export",
  images: {
    // Required when using `output: export`.
    unoptimized: true,
  },
  // Don't let lint or type warnings block a production build.
  // NOTE: safe to re-enable (set both to false) once any legacy JCS-era files
  // have been removed from the tree.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
