import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** @type {import('next').NextConfig} */
  env: {
    NEXT_PUBLIC_WOOCOMMERCE_STORE_URL: process.env.NEXT_PUBLIC_WOOCOMMERCE_STORE_URL,
    NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY,
    NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET: process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET,
    NEXT_PUBLIC_SQUARE_ACCESS_TOKEN: process.env.NEXT_PUBLIC_SQUARE_ACCESS_TOKEN,
    NEXT_PUBLIC_SQUARE_LOCATION_ID: process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    SQUARE_WEBHOOK_SIGNATURE_KEY: process.env.SQUARE_WEBHOOK_SIGNATURE_KEY,
  },
 

  eslint: {
    ignoreDuringBuilds: true,
  }
};

export default nextConfig;
