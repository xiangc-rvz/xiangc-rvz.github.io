import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Xiang Chen",
  description:
    "Xiang Chen's personal website.",
  authors: [{ name: "Xiang Chen" }],
  icons: {
    icon: [
      { url: "/icons/favicon/favicon-32x32.png", sizes: "32x32" },
      { url: "/icons/favicon/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/icons/favicon/apple-touch-icon.png",
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
