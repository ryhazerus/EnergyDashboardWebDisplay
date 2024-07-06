/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
          // Basic redirect
          {
            source: '/',
            destination: '/pages/setup',
            permanent: true,
          },
        ]
      },
};

export default nextConfig;
