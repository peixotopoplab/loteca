/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true'
const repoName = 'loteca'

const nextConfig = {
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true },
  trailingSlash: true,
  ...(isGithubPages ? { basePath: `/${repoName}`, assetPrefix: `/${repoName}/` } : {}),
}

module.exports = nextConfig
