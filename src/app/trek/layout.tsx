'use client'

import SideNav from "@/components/SideNav";
import { useAppContext } from '@/context';

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {trekContext: { route }} = useAppContext()

  return (
    <div>
      <SideNav routeName={route}/>
      <section>
        {children}
      </section>
    </div>
  );
}