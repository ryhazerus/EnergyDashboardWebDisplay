/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/pages/setup',
            permanent: false,
          },
        ]
      },
};

export default nextConfig;
