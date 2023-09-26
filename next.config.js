/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.topgear.com', 'autoartmodels.de', 'istockphoto.com', 'cdn.autobild.es', "media.istockphoto.com"]
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BUCKETEER: process.env.NEXT_PUBLIC_BUCKETEER,
    NEXT_PUBLIC_JSON: process.env.NEXT_PUBLIC_JSON,
    NEXT_PUBLIC_MAIL: process.env.NEXT_PUBLIC_MAIL,
    NEXT_PUBLIC_CDN: process.env.NEXT_PUBLIC_CDN,
    NEXT_PUBLIC_DYNAMIC365: process.env.NEXT_PUBLIC_DYNAMIC365,
    NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
  }
}

module.exports = nextConfig
