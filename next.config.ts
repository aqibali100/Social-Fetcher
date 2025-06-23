const nextConfig = {
  reactStrictMode: true,
  i18n: require('./next-i18next.config').i18n,
   images: {
    domains: ['images.pexels.com'],
    // Optional: Configure other image optimization settings
    // formats: ['image/webp'],
    // minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
