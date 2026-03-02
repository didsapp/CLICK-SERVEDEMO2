import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap", // Improves perceived performance
});

export const metadata: Metadata = {
  title: "Click-Serve | Nigeria's Leading Diesel Supply Network",
  description: "Fast, reliable, cost-saving diesel delivery across Nigerian cities. Connecting verified suppliers with premium buyers on the SkyWhale network.",
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: "#FFD700", // SkyWhale Yellow
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
