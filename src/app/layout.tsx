import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ApiSync } from "@/components/api-sync";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust — Discover Your Next Adventure",
  description:
    "Explore breathtaking destinations and create unforgettable memories with our curated travel experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} min-h-dvh flex flex-col antialiased`}>
        <ApiSync />
        <Navbar />
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
