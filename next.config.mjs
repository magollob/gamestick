/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hebbkx1anhila5yf.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Configuração para build estático (hospedagem manual)
  output: 'export',
  trailingSlash: true,
  distDir: 'out',
  // Desabilitar recursos que precisam de servidor
  experimental: {
    serverComponentsExternalPackages: []
  }
}

export default nextConfig
