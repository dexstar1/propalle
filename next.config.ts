
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  allowedDevOrigins: ["*"],
}

module.exports = nextConfig
