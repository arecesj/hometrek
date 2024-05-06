'use client'

import { FC, ReactNode } from "react"
import Header from "./Header";
import { manageRouteName } from "@/constants/routes";

type PageFoundationProps = {
  routeName: manageRouteName;
  children: ReactNode;
}

const PageFoundation: FC<PageFoundationProps> = ({ routeName, children }) => {
  return(
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-b from-beige to-blue-50">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header routeName={routeName} />
        {children}
      </div>
    </div>
  )
}

export default PageFoundation;