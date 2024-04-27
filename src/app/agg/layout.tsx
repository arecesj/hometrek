'use client'

import SideNav from "@/components/Agg/SideNav";

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideNav />
      <body>{children}</body>
    </div>
  );
}