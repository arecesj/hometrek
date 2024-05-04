'use client'

import SideNav from "@/components/SideNav";
import { useAppContext } from '@/context';

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { routeContext } = useAppContext()

  return (
    <div>
      <SideNav routeName={routeContext}/>
      <section>
        {children}
      </section>
    </div>
  );
}