'use client'

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
import { Button } from "@/components/ui/button"
import { Star, StarHalf } from 'lucide-react'
import { useAppContext } from '@/context'
import { formatToUSD } from "@/lib/utils"

const InspectionsTable = () => {
  const {
    homeClosingContext,
    homeClosingContext: {
      zipCode,
      inspections: {
        offeredInspectors,
        selectedInspector
      }
    },
    setHomeClosingContext
  } = useAppContext();
  return (
    <Tabs defaultValue="inspections">
      <div className="flex items-center">
      </div>
      <TabsContent value="inspections">
        <Card x-chunk="dashboard-05-chunk-4">
          <CardHeader className="px-7 bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              Inspections
            </CardTitle>
            <CardDescription>
              {`Here are the best rates for home inspectors in ${zipCode}`}
            </CardDescription>
          </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Home Inspector
                  </TableHead>
                  <TableHead>
                    Their pitch to you
                  </TableHead>
                  <TableHead>
                    Location
                  </TableHead>
                  <TableHead>
                    Avg. Cost
                  </TableHead>
                  <TableHead className="text-right">
                    Select Inspector
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offeredInspectors.map((inspector) => {
                  const {id, name, rating, location, display_phone} = inspector;
                  const inspectorSelected = !!selectedInspector && !!selectedInspector.id
                  const isSelectedInspector = inspectorSelected && selectedInspector.id === id;
                  const greyoutField = inspectorSelected && !isSelectedInspector
                  const starRating = () => {
                    let stars = Array.from({ length: Math.floor(rating) as number }, (i: number) => (
                      <Star key={i} className="h-3 w-3" fill={greyoutField ? "white" : 'grey'} strokeWidth={0} />
                    ))
                    
                    rating > Math.floor(rating) &&
                      stars.push((
                        <StarHalf className="h-3 w-3" fill={greyoutField ? "white" : 'grey'} strokeWidth={0} />
                      ))
                    
                    return (
                      <div className="relative">
                        <div className="flex">
                          {stars}
                        </div>
                      </div>
                    )
                  }
                    
                  return(
                    <TableRow key={id} className={greyoutField ? "text-slate-300" : ""}>
                      <TableCell>
                      <div className="font-medium">{name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {starRating()}
                        </div>
                      </TableCell>
                      <TableCell>
                      We specialize in buyer and seller home inspections.
                      </TableCell>
                      <TableCell>
                        {location.display_address.map((addr, i) => (
                          <div key={i} className="font-medium">{addr}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {formatToUSD(display_phone)}
                      </TableCell>
                      <TableCell className="text-right">
                      {!inspectorSelected ? (
                          <Button
                            size="sm"
                            onClick={() => {
                              setHomeClosingContext({
                                ...homeClosingContext,
                                inspections: {
                                  ...homeClosingContext.inspections,
                                  selectedInspector: {
                                    id,
                                    name,
                                    rating,
                                    location,
                                    display_phone
                                  }
                                }
                              })
                            }}
                          >
                            {`Select`}
                          </Button>
                        ) :
                        isSelectedInspector ? (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setHomeClosingContext({
                                  ...homeClosingContext,
                                  inspections: {
                                    ...homeClosingContext.inspections,
                                    selectedInspector: {} as SelectedInspector
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
  )
}

export default InspectionsTable;