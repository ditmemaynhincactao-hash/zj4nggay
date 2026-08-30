import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VIPACC — Chợ Tài Khoản Game Siêu VIP",
  description: "Uy tín - Tự động 100%. Genshin, Free Fire, Liên Quân, Valorant.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}
