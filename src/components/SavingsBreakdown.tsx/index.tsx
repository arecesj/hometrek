'use client'
import { FC } from 'react'
import {
  MoreVertical,
  RefreshCw
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type SavingsBreakdownProps = {
  userData: UserData;
  date: string;
}

const SavingsBreakdown: FC<SavingsBreakdownProps> = ({ userData, date }) => {
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
            <CardDescription>{`Date: ${date}`} </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
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
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">{`User Breakdown: ${userData.name}`}</div>
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
                  <span>$410,000</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Down Payment
                  </span>
                  <span>{`$${userData.downPayment}`}</span>
                </li>
                {/* <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    State
                  </span>
                  <span>New York</span>
                </li> */}
              </ul>
            <Separator className="my-2" />
            <div className="font-semibold">Selected Lender: A Lender</div>
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Original Loan Amount
                </span>
                <span className="text-decoration-line: line-through text-rose-700">$400,000.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  HomeTrek Loan Amount
                </span>
                <span>$390,000.00</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Interest Rate
                </span>
                <span>7.2%</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <div className="font-semibold">HomeTrek Savings</div>
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
          </div>
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

export default SavingsBreakdown