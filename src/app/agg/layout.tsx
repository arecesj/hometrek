'use client'

import SideNav from "@/components/Agg/SideNav";

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body>
      <SideNav />
      {children}
    </body>
  );
}