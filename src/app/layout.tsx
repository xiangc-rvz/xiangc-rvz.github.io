import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xiang Chen",
  description:
    "Xiang Chen's personal website.",
  authors: [{ name: "Xiang Chen" }],
  icons: {
    icon: [
      { url: "/icons/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon/cx-icon.png", sizes: "682x682", type: "image/png" },
    ],
    apple: [{ url: "/icons/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
