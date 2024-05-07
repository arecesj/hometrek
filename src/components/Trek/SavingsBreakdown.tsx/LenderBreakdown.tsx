'use client'

import { FC } from "react"
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { formatToUSD, subtractNumStrings } from "@/lib/utils";


type LenderBreakdownProps = {
  isLenderSelected: boolean;
  potentialHomePrice: string;
  potentialDownPayment: string;
  name: string;
}

const LenderBreakdown: FC<LenderBreakdownProps> = ({ isLenderSelected, potentialHomePrice, potentialDownPayment, name }) => {
  const loanAmt = subtractNumStrings(potentialHomePrice, potentialDownPayment);
    const htLoanAmt = subtractNumStrings(loanAmt, "1000");
    const showLenderName = isLenderSelected && name;
    return (
      <div>
        <AccordionItem value="lender">
          <AccordionTrigger className="font-semibold">{`Selected Lender: ${showLenderName}`}</AccordionTrigger>
          <AccordionContent>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Original Loan Amount
                </span>
                <span className="text-decoration-line: line-through text-rose-700">{`${formatToUSD(loanAmt)}`}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  HomeTrek Loan Amount
                </span>
                <span>{`${formatToUSD(htLoanAmt)}`}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Interest Rate
                </span>
                <span>7.2%</span>
              </li>
            </ul>
          </AccordionContent>

        </AccordionItem>
      </div>
    )
}

export default LenderBreakdown;