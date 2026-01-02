import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { KatanaSearch } from "@/components/katana-search";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haruli-kit.vercel.app"),
  title: "Haruli Kit | 個人開發工具庫",
  description: "專為現代開發者打造的個人軍火庫。收集最常用的套件、Hooks 與 UI 元件。",
  icons: {
    icon: "/haru-logo.jpg",
    apple: "/haru-logo.jpg",
  },
  openGraph: {
    title: "Haruli Kit | 個人開發工具庫",
    description: "專為現代開發者打造的個人軍火庫。收集最常用的套件、Hooks 與 UI 元件。",
    images: ["/haru-logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW">
      <body className="font-sans antialiased grid-bg selection:bg-orange-400 selection:text-slate-900">
        {/* The Sun Background */}
        <div className="ronin-sun" />

        <Navbar />
        <KatanaSearch />

        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
