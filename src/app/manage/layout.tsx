'use client'

import SideNav from "@/components/Manage/SideNav";

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SideNav />
      <section>
        {children}
      </section>
    </div>
  );
}