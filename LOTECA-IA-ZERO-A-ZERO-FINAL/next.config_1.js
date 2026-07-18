/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'loteca-ia-web' // <-- TROQUE AQUI se seu repo tem outro nome

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true },
  trailingSlash: true,
  // Se for GitHub Pages, precisa do basePath
  ...(isGithubPages ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` } : {}),
}

module.exports = nextConfig
