import type { Metadata } from "next";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

export const metadata: Metadata = {
  title: "N FREE SHOP — Korea Coupon & Tour Platform",
  description: "Discover exclusive coupons for restaurants, shopping, and experiences across South Korea. Free for international tourists.",
  keywords: ["Korea coupon", "Korea discount", "Incheon", "duty free", "K-beauty", "FIT travel Korea"],
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "N FREE SHOP",
  },
  themeColor: "#0B1A30",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen bg-white">
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
