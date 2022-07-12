/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['media.graphassets.com', 'media.graphcms.com'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig;
