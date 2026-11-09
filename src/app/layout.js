import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers/providers";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "StudioSpace | Find Your Creative Space",
    template: "%s | StudioSpace",
  },
  description:
    "Discover and book inspiring creative workspaces, photography studios, podcast rooms, music suites, and production spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
      <Providers>
  <Navbar />
  <main className="flex-1">{children}</main>
  <Footer />
</Providers>
      </body>
    </html>
  );
}