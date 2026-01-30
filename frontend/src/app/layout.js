import { Geist, Geist_Mono } from "next/font/google";
//import Navbar from "../components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Kritz Bitz",
  description: "01000011 01101000 01110010 01101001 01110011 01110100 00100000 01101001 01110011 00100000 01001011 01101001 01101110 01100111",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <style>{`html { scroll-behavior: smooth; }`}</style>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          {/*<Navbar>*/}
          {children}
      </body>
    </html>
  );
}
