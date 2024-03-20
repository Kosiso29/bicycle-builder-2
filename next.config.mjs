/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['www.cervelo.com', 'assets.specialized.com', 'www.enve.com', 'enve.com', 'images2.giant-bicycles.com', 'giant-bicycles.com', 'cervelo.com', 'specialized.com', 'i.postimg.cc'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.postimg.cc',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'assets.specialized.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'www.cervelo.com',
                pathname: '**',
            },
        ]
    }
};

export default nextConfig;
