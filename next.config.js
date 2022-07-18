/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,  
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT
  },
  compiler: {
    // see https://styled-components.com/docs/tooling#babel-plugin for more info on the options.
    emotion: true
  }
}

module.exports = nextConfig
