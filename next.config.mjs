/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["info.renome.ua"],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
};

export default nextConfig;
