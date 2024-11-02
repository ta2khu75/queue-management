/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                port: '',
                pathname: '/**',
            },{
                protocol: 'https',
                hostname: 'nextjs.org',
                port: '',
                pathname: '/icons/**',
            }
        ],
        dangerouslyAllowSVG: true, // Enable SVG support
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;", // Optional security policy
    },
};

export default nextConfig;
