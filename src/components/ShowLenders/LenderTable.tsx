'use client'

import { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
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

type LenderTableProps = {
  userData: UserData;
  lenders: Lenders;
  date: string;
}

const LenderTable: FC<LenderTableProps> = ({userData, lenders, date}) => {
  return (
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
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>Lenders</CardTitle>
            <CardDescription>
              Here are the best lenders in your area
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lender</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Min. Credit Score
                  </TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Min. Down payment
                  </TableHead>
                  <TableHead className="hidden md:table-cell text-center">
                    Date
                  </TableHead>
                  <TableHead className="text-right">Loan Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(lenders).map(([key, value]) => {
                  const { name, nmls, minCreditScore, minDownPaymentPercentage} = value;
                  return(
                    <TableRow key={key}>
                      <TableCell>
                        <div className="font-medium">{name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {`NMLS#${nmls}`}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        {minCreditScore}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-center">
                        {`${minDownPaymentPercentage}%`}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-center">
                        {date}
                      </TableCell>
                      <TableCell className="text-right">{`$${userData.downPayment}`}</TableCell>
                    </TableRow>
                  )
                })}                   
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default LenderTable;