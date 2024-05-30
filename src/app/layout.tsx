import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/toaster"
import { AppWrapper } from "@/context";
import { NextAuthProvider } from "@/components/Provider";
import "./globals.css";
import 'aos/dist/aos.css'
import './css/style.css'

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeTrek",
  description: "The all-in-one platform to close your new home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  

  return (
    <html lang="en">
      <body className={`${mulish.className} font-inter antialiased bg-white text-gray-900 tracking-tight`}>
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
          <AppWrapper>
            <NextAuthProvider>
              {children}
            </NextAuthProvider>
            <Analytics />
            <SpeedInsights />
            <Toaster />
          </AppWrapper>
        </div>
      </body>
    </html>
  );
}
