'use client'

import { FC } from 'react'
import { useRouter } from 'next/navigation'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatToUSD, subtractNumStrings } from '@/utils/helpers'
import { Button } from '../ui/button'
import { useAppContext } from '@/context'

type LendersTableProps = {
  user: UserContext;
  lenders: LendersContext;
  fakeLenders: Lenders;
}

const LendersTable: FC<LendersTableProps> = ({ user , fakeLenders, lenders }) => {
  const { context, setContext } = useAppContext()
  const loanAmt = subtractNumStrings(lenders.potentialHomePrice, lenders.potentialDownPayment)
  return (
    <>
    <Tabs defaultValue="lenders">
      <div className="flex items-center">
        {/* <TabsList>
          <TabsTrigger value="lenders">Option 1</TabsTrigger>
          <TabsTrigger value="month">Option 2</TabsTrigger>
          <TabsTrigger value="year">Option 3</TabsTrigger>
        </TabsList> */}
        {/* <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-7 gap-1 text-sm"
              >
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Recommended
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Highest Rated
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>
                Most Reviewed
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            size="sm"
            variant="outline"
            className="h-7 gap-1 text-sm"
          >
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div> */}
      </div>
      <TabsContent value="lenders">
        <Card x-chunk="dashboard-05-chunk-4">
          <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Lenders
            </CardTitle>
            <CardDescription>
              Here are the best lenders in your area
            </CardDescription>
          </div>  
          </CardHeader>
          <CardContent className="p-7 text-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Lender
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Loan Amount
                  </TableHead>
                  <TableHead>
                    Min. Credit Score
                  </TableHead>
                  <TableHead>
                    Min. Down payment
                  </TableHead>
                  <TableHead className="text-right">
                    Select Lender
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(fakeLenders).map(([key, value]) => {
                  const { name, nmls, minCreditScore, minDownPaymentPercentage} = value;
                  const lenderSelected = !!context.lenders.selectedLender && !!context.lenders.selectedLender.name
                  const isSelectedLender = lenderSelected && context.lenders.selectedLender.name === name;
                  const greyoutField = lenderSelected && !isSelectedLender
                  return(
                    <TableRow key={key} className={greyoutField ? "text-slate-300" : ""}>
                      <TableCell>
                        <div className="font-medium">{name}</div>
                        <div className={`hidden text-sm md:inline ${greyoutField ? "" : "text-muted-foreground"}`}>
                          {`NMLS#${nmls}`}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {formatToUSD(loanAmt)}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        {minCreditScore}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        {`${minDownPaymentPercentage}%`}
                      </TableCell>
                      <TableCell className="text-right">
                        {!lenderSelected ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              setContext({
                                ...context,
                                lenders: {
                                  ...context.lenders,
                                  selectedLender: value
                                }
                              })
                            }}
                          >
                            {`Select`}
                          </Button>
                        ) :
                          isSelectedLender ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setContext({
                                  ...context,
                                  lenders: {
                                    ...context.lenders,
                                    selectedLender: {} as SelectedLender
                                  }
                                })
                              }}
                            >
                              {`Remove`}
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              disabled
                            >
                              {`Select`}
                            </Button>
                          )}
                      </TableCell>
                    </TableRow>
                  )
                })}                   
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
    </>
  )
}

export default LendersTable;