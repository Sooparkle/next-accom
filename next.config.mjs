/** @type {import('next').NextConfig} */
// const path = require('path') //SCSS
import path from 'path';


const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'qewhtvhdpjurupkjnnrj.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
      },
    ],
  },
    sassOptions: {
      // includePaths: [path.join(__dirname, 'styles')],
      includePaths: [path.join(process.cwd(), 'styles')],
    },

};


export default nextConfig;
