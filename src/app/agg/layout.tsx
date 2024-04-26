'use client'

export default function GetStartedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <body>{children}</body>
    </>
  );
}