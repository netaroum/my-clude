import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PR漫画ジェネレーター | お店・企業のPR広報漫画を自動生成",
  description:
    "会社・店舗情報を入力するだけで、AIがPR広報漫画を自動生成。画像付きの本格的な漫画コンテンツを数秒で作成できます。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSansJP.className}>{children}</body>
    </html>
  );
}
