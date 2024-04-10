'use client'
import SideNav from "@/components/SideNav";

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SideNav />
      <body>{children}</body>
    </>
  );
}