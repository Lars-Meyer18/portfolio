/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    // Root layout lives in app/[locale], so unmatched URLs need a global 404.
    globalNotFound: true,
  },
}

export default nextConfig
