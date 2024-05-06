'use client'

import Navigation from "@/components/LandingPage/Navigation";

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div>
      <Navigation isHome={false} />
      <hr />
      <section>
        {children}
      </section>
    </div>
  );
}