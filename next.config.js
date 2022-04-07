/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"]
  }
}

module.exports = nextConfig
