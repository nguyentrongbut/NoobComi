/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "mangadex.org",
                port: "",
                pathname: "/covers/**",
            },
        ],
    },
};

export default nextConfig;
