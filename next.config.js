/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
  // GitHub Pages 部署路徑
  basePath: '/meat-knowledge-hub',
  assetPrefix: '/meat-knowledge-hub/',
  trailingSlash: true,
}

module.exports = nextConfig
