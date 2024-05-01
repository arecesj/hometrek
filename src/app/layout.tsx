import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Toaster } from "@/components/ui/toaster"
import { AppWrapper } from "@/context";
import { NextAuthProvider } from "@/components/Provider";
import "./globals.css";

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
      <body className={mulish.className}>
        <AppWrapper>
          <NextAuthProvider>
            {children}
          </NextAuthProvider>
          <Analytics />
          <SpeedInsights />
          <Toaster />
        </AppWrapper>
      </body>
    </html>
  );
}
