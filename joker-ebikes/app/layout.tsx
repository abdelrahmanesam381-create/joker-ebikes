import type { Metadata } from "next";
import { Archivo_Black, Permanent_Marker, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";

const archivo = Archivo_Black({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: "400",
});

// Handwritten marker font, only for small hand-drawn notes
const marker = Permanent_Marker({
  variable: "--font-marker-hand",
  subsets: ["latin"],
  weight: "400",
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "JOKER | Urban E-Bikes",
  description: "Pick your card. Ride your city.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceMono.variable} ${marker.variable} h-full`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
