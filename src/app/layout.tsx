import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick Poll — What's for lunch?",
  description: "Live voting app with real-time results",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
