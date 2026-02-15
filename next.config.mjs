/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // If you are deploying to https://<username>.github.io/<repository-name>/,
  // uncomment the following lines and replace '<repository-name>' with your repo's name.
  // basePath: '/<repository-name>',
  // assetPrefix: '/<repository-name>',
}

export default nextConfig
