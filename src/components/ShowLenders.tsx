'use client';

import Link from "next/link"
import { useSearchParams, redirect } from 'next/navigation'
import { useEffect, useState } from "react";
import {
  MoreVertical,
  Search,
  User,
  RefreshCw
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
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
import Loading from "./LoadingSpinner";
import { lenders } from "@/constants/lenders";

const ShowLenders = () => {
  const searchParams = useSearchParams()
  const [isLoading, setLoading] = useState<boolean>(true);
  const date = new Date().toDateString();
  
  const userData = {
    name: searchParams.get("name"),
    state: searchParams.get("state"),
    downPayment: searchParams.get("downPayment")
  }

  const checkSearchParams = () => {
    for (const [key, value] of Object.entries(userData)) {
      if(!value) redirect('/')
    }
    setLoading(false);
  }
  
  
  useEffect(() => {
    checkSearchParams();
  }, [userData])  

  return (
    <>
    {isLoading ? (<Loading />) : (
      <div className="flex min-h-screen w-full flex-col bg-beige">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          {/* TODO: Find if this can be useful at some point */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
              </nav>
            </SheetContent>
          </Sheet> */}
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="#">Find a lender</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Potential Savings</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Potential calculated savings on Hometrek
                  </CardDescription>
                  <CardTitle className="text-4xl">$1,000</CardTitle>
                </CardHeader>
                <CardFooter>
                  <Button>Learn more</Button>
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <div className="text-xs text-muted-foreground">
                    Hometrek Suggestion
                  </div>
                  <CardDescription>Guaranteed Rate</CardDescription>
                  <CardTitle className="text-4xl">$1,500</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +50% savings
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={50} aria-label="50% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <div className="text-xs text-muted-foreground">
                    Hometrek Suggestion
                  </div>
                  <CardDescription>NBKC Bank</CardDescription>
                  <CardTitle className="text-4xl">$1,250</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% savings
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                {/* <TabsList>
                  <TabsTrigger value="week">Option 1</TabsTrigger>
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
              <TabsContent value="week">
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
          </div>
          <div>
            <Card
              // className="fixed overflow-hidden" x-chunk="dashboard-05-chunk-4"
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
                        <span>-</span>
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
                        Hometrek Loan Amount
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
                  <div className="font-semibold">Hometrek Savings</div>
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
        </main>
      </div>
      </div>
    )}
    </>
  )
}

export default ShowLenders;