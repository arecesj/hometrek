'use client'

import { FC } from "react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatToUSD, subtractNumStrings } from "@/utils/helpers";

type InspectorBreakdownProps = {
  isInspectorSelected: boolean;
  name: string;
  display_phone: string;
}

const InspectorBreakdown: FC<InspectorBreakdownProps> = ({ isInspectorSelected, name, display_phone }) => {

  const showInspectorName = isInspectorSelected && name;
  return (
    <div>
      <AccordionItem value="inspector">
        <AccordionTrigger className="font-semibold">{`Selected Inspector: ${showInspectorName}`}</AccordionTrigger>
        <AccordionContent>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Avg. Customer Cost
              </span>
              <span>{`${formatToUSD(display_phone)}`}</span>
            </li>
          </ul>
        </AccordionContent>

      </AccordionItem>
    </div>
  )
}

export default InspectorBreakdown