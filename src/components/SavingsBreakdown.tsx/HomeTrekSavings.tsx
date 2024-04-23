'use client'
import { FC } from "react"
import { 
  AccordionItem,
  AccordionContent,
  AccordionTrigger
} from "../ui/accordion"

type HomeTrekSavingsProps = {}

const HomeTrekSavings: FC<HomeTrekSavingsProps> = ({ }) => {
  return (
    <AccordionItem value="homeTrekSavings">
      <AccordionTrigger>HomeTrekSavings</AccordionTrigger>
      <AccordionContent>
        <ul className="grid gap-3">
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Using A Lender</span>
            <span>$1000.00</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-muted-foreground">Something else here</span>
            <span>$500</span>
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
