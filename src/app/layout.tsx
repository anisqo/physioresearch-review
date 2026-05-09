import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhysioResearchReview",
  description:
    "Strona główna studenckiego koła naukowego PhysioResearchReview.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
