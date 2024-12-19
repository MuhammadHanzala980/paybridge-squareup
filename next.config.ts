import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** @type {import('next').NextConfig} */
  env: {
    WOOCOMMERCE_STORE_URL: process.env.WOOCOMMERCE_STORE_URL,
    WOOCOMMERCE_CONSUMER_KEY: process.env.WOOCOMMERCE_CONSUMER_KEY,
    WOOCOMMERCE_CONSUMER_SECRET: process.env.WOOCOMMERCE_CONSUMER_SECRET,
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  }
};

export default nextConfig;
