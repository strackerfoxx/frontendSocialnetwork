/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'tinypic.host', 'backend-insta-nine.vercel.app'],
  },
}

module.exports = nextConfig
