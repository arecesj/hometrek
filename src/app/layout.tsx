import type { Metadata } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";
import { AppWrapper } from "@/context"

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HomeTrek",
  description: "The all-in-one platform to close your new home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={mulish.className}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
