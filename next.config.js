/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT
  }
}

module.exports = nextConfig
