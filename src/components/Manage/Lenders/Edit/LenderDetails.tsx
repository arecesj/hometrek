'use client'

import { Dispatch, FC, SetStateAction } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type LenderDetailsProps = {
  existingLenders: LendersContext;
  editedLenderDetails: LendersContext;
  setEditedLenderDetails: Dispatch<SetStateAction<LendersContext>>;
}

const LenderDetails: FC<LenderDetailsProps> = (props) => {
  const {
    existingLenders,
    editedLenderDetails,
    setEditedLenderDetails
  } = props
  return (
    <div>
      <Card x-chunk="dashboard-05-chunk-4">
        <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Lender Details
            </CardTitle>
            <CardDescription>
              What is something I can write here?
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default LenderDetails