'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../ui/button'

const SubHeader = () => {
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
          Select the lender that best fits your needs
        </p>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-6">
        <div className="space-x-2">
          {/* <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/trek/lenders")}
          >
            Start Over
          </Button> */}
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/trek/inspections">Next: Find Inspectors</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SubHeader