'use client'

import { FC } from "react"
import { Button } from "@/components/ui/button";

type EditSubheaderProps = {
  subHeaderContent: string;
  onDelete: () => void;
  onDeleteText: string;
  onCancel: () => void;
}

const EditSubheader: FC<EditSubheaderProps> = (props) => {
  const { subHeaderContent, onDelete, onDeleteText, onCancel } = props
  const btnWidth = "w-[150px]"
  
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-2">
      <div className="grid gap-2 justify-start px-7">
        <h1 className="text-3xl font-bold">HomeTrek</h1>
        <p className="text-balance text-muted-foreground">
          {subHeaderContent}
        </p>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-6">
        <Button
          size="lg"
          onClick={() => onCancel()}
          className={btnWidth}
        >
          Back to Dashboard
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => onDelete()}
          className={`${btnWidth} text-red-500`}
        >
          {onDeleteText}
        </Button>
      </div>
    </div>
  )
}

export default EditSubheader