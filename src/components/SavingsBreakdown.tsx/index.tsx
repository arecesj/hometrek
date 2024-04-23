'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useAppContext } from '@/context'
import UserBreakdown from "./UserBreakdown"
import LenderBreakdown from "./LenderBreakdown"
import HomeTrekSavings from "./HomeTrekSavings"

const SavingsBreakdown = () => {
  const {
    context: {
      user,
      lenders: {
        potentialDownPayment,
        potentialHomePrice,
        selectedLender
      }
    }
  } = useAppContext()
  
  const isLenderSelected = !!selectedLender && !!selectedLender.name;
  
  return (
    <div>
      <Card
        className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
      >
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Savings Breakdown
              {/* <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Potential Savings</span>
              </Button> */}
            </CardTitle>
            <CardDescription>{`Date: ${user.date}`} </CardDescription>
          </div>
          {/* <div className="ml-auto flex items-center gap-1">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <RefreshCw className="h-3.5 w-3.5"/>
              <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                Recalculate 
              </span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div> */}
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={
              [
                "user",
                "lender",
                "inspector",
                "appraiser",
                "insurance",
                "title",
                "closingDay",
                "homeTrekSavings"
              ]
            }
          >
            <UserBreakdown
              name={user.name}
              potentialHomePrice={potentialHomePrice}
              potentialDownPayment={potentialDownPayment}
            />
            {isLenderSelected && (
              <LenderBreakdown
                isLenderSelected={isLenderSelected}
                potentialHomePrice={potentialHomePrice}
                potentialDownPayment={potentialDownPayment}
                name={selectedLender.name}
              />
            )}
            <HomeTrekSavings />
          </Accordion>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          {/* <div className="text-xs text-muted-foreground">
            Updated <time dateTime="2023-11-23">April 10, 2024</time>
          </div> */}
          {/* <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only">Previous Order</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="sr-only">Next Order</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination> */}
        </CardFooter>
      </Card>
    </div>
  )
}

export default SavingsBreakdown;