'use client'

import { FC } from "react"
import { Button } from "@/components/ui/button";

type EditSubheaderProps = {
  subHeaderContent: string;
  onUpdate: () => void;
  onDelete: () => void;
  onDeleteText: string;
  onCancel: () => void;
}

const EditSubheader: FC<EditSubheaderProps> = (props) => {
  const { subHeaderContent, onUpdate, onDelete, onDeleteText, onCancel } = props
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
          variant="default"
          size="lg"
          onClick={() => onUpdate()}
          className={btnWidth}
        >
          Save & Go back
        </Button>
        <Button
          variant="destructive"
          size="lg"
          onClick={() => onDelete()}
          className={btnWidth}
        >
          {onDeleteText}
        </Button>
        <Button
          variant="outline"
          size="lg"
          onClick={() => onCancel()}
          className={btnWidth}
        >
          Go back
        </Button>
      </div>
    </div>
  )
}

export default EditSubheader