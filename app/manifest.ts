import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "N FREE SHOP — Korea Coupon Platform",
    short_name: "N FREE SHOP",
    description: "Exclusive coupons for Korea FIT travelers · 한국 여행 쿠폰 플랫폼",
    start_url: "/coupons",
    display: "standalone",
    background_color: "#0B1A30",
    theme_color: "#0B1A30",
    orientation: "portrait",
    categories: ["travel", "shopping", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
    shortcuts: [
      { name: "QR Scan", short_name: "Scan", url: "/scan", description: "Scan merchant QR code" },
      { name: "Map", short_name: "Map", url: "/map", description: "Find nearby merchants" },
    ],
  };
}
