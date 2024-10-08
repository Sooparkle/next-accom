import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "좀쉼쉼, 숙박사이트",
  description: "좀쉬엄쉬엄하고 살아가는 재미",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body >
        {children}
      </body>
    </html>
  );
}
