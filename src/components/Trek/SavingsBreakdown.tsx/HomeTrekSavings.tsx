'use client'
import { FC } from "react"
import { 
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from "../../ui/accordion"

type HomeTrekSavingsProps = {}

const HomeTrekSavings: FC<HomeTrekSavingsProps> = ({ }) => {
  return (
    <AccordionItem value="homeTrekSavings">
      <AccordionTrigger>HomeTrek Savings</AccordionTrigger>
      <AccordionContent>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Lender Savings</span>
            <span className="text-green-700">-$1000.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Inspection Savings</span>
            <span className="text-green-700">-$500</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Taxes</span>
            <span>$25.00</span>
          </li>
          <li className="flex items-center justify-between font-semibold">
            <span className="text-muted-foreground">Total Savings</span>
            <span>$1,525.00</span>
          </li>
        </ul>
      </AccordionContent>
    </AccordionItem>
  )
}

export default HomeTrekSavings;
