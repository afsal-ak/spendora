import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/home/Navbar";
import { Toaster } from "sonner";
const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spendora",

  description:
    "AI spend audit platform for startups and engineering teams.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geist.className} antialiased`}
      >
        <Navbar />

        {children}
          <Toaster richColors />

      </body>
    </html>
  );
}