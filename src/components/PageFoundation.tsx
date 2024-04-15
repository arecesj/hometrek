'use client'

const PageFoundation = ({ children }: Readonly<{
  children: React.ReactNode;
}>) => {
  return(
    <div className="flex min-h-screen w-full flex-col bg-beige">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        {children}
      </div>
    </div>
  )
}

export default PageFoundation;