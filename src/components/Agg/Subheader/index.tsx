'use client'

import { FC } from "react"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { universalRouteName, universalRoutes } from "@/constants/routes"

type SubHeaderProps = {
  subHeaderContent: string;
  showPreviousButton: boolean;
  previousButtonContent: string;
  previousButtonHref: string;
  showCreateProfileButton: boolean;
}

const SubHeader: FC<SubHeaderProps> = ({
  subHeaderContent,
  showPreviousButton,
  previousButtonContent,
  previousButtonHref,
  showCreateProfileButton
}) => {
  const router = useRouter();

  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
      {/* <div className="flex items-center justify-end space-x-2 py-4 px-6">
        <h1 className="text-3xl font-bold">HomeTrek Lenders</h1>
        <p className="text-balance text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div> */}
      <div className="grid gap-2 justify-start px-7">
        <h1 className="text-3xl font-bold">HomeTrek</h1>
        <p className="text-balance text-muted-foreground">
          {subHeaderContent}
        </p>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-6">
        <div className="space-x-2">
          {showPreviousButton && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.push(previousButtonHref)}
              className="w-[226px]"
            >
              {previousButtonContent}
            </Button>

          )}
          {showCreateProfileButton && (
            <Button
            size="lg"
            asChild
            className="w-[226px]"
            >
              <Link href={universalRoutes[universalRouteName.SIGNUP].route}>
                Save your profile
              </Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SubHeader