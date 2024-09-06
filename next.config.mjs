/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
                pathname: "/fife/**",
            },
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
