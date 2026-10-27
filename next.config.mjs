/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
  },
  experimental: {
    // Root layout lives in app/[locale], so unmatched URLs need a global 404.
    globalNotFound: true,
    // The stylesheet is small; inlining it removes the render-blocking request.
    inlineCss: true,
  },
}

export default nextConfig
