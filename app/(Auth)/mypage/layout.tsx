import Footer from "@/app/components/Footer";
import Header from "../../components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body >
        <Header 
          type="mypage"
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
