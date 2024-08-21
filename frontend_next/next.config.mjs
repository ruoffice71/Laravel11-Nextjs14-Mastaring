/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                hostname:"localhost", //for  live server it will be domain name like- example.com
                protocol:"http" //if ssl has then it will be "https"
            },

            {
                hostname:"*", //for all live server it will be domain name like- example.com
                protocol:"https" //if ssl has then it will be "https"
            }
        ]
    },

    // this line will be commented before live.
    reactStrictMode: false,
};

export default nextConfig;
