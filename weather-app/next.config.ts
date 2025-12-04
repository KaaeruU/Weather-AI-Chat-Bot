/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Aggiungi queste due sezioni:
  eslint: {
    // Ignora gli errori di linting durante la build
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignora gli errori di tipo durante la build
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig;