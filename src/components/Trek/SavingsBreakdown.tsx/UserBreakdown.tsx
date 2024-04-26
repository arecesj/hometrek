'use client'

import { FC } from "react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatToUSD } from "@/utils/helpers";

type UserBreakdownProps = {
  name: string;
  potentialHomePrice: string;
  potentialDownPayment: string;
}

const UserBreakdown: FC<UserBreakdownProps> = ({ name, potentialHomePrice, potentialDownPayment }) => {
  return (
    <AccordionItem value="user">
      <AccordionTrigger className="font-semibold">{`User Breakdown: ${name}`}</AccordionTrigger>
      <AccordionContent>
          <ul className="grid gap-3">
            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Credit Score
              </span>
              <span>720</span>
            </li> */}
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Home Price
              </span>
              <span>{`${formatToUSD(potentialHomePrice)}`}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Down Payment
              </span>
              <span>{`${formatToUSD(potentialDownPayment)}`}</span>
            </li>
            {/* <li className="flex items-center justify-between">
              <span className="text-muted-foreground">
                State
              </span>
              <span>New York</span>
            </li> */}
          </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default UserBreakdown;