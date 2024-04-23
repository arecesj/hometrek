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

const InspectionsTable = () => {
  const { context, context: { user: { zipCode } , inspections: { offeredInspectors } } } = useAppContext();
  return (
    <Tabs defaultValue="inspections">
      <div className="flex items-center">
        {/* TODO area for tabs later on */}
      </div>
      <TabsContent value="inspections">
        <Card x-chunk="dashboard-05-chunk-3">
          <CardHeader className="px-7">
            <CardTitle>
              Inspections
            </CardTitle>
            <CardDescription>
              {`Here are the best home inspectors for ${zipCode}`}
            </CardDescription>
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
                    Phone Number
                  </TableHead>
                  <TableHead className="text-right">
                    Request Quote
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {offeredInspectors.map((inspector) => {
                  const {id, name, rating, location, display_phone} = inspector;
                  const starRating = () => {
                    let stars = Array.from({ length: Math.floor(rating) as number }, (i: number) => (
                      <Star key={i} className="h-3 w-3" fill="grey" strokeWidth={0} />
                    ))
                    
                    rating > Math.floor(rating) &&
                      stars.push((
                        <StarHalf className="h-3 w-3" fill="grey" strokeWidth={0} />
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
                    <TableRow key={id}>
                      <TableCell>
                      <div className="font-medium">{name}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {starRating()}
                        </div>
                      </TableCell>
                      <TableCell>
                      We specialize in buyer and seller home inspections. Extensive knowledge inspecting properties of all
                      types.
                      </TableCell>
                      <TableCell>
                        {location.display_address.map((addr, i) => (
                          <div key={i} className="font-medium">{addr}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {display_phone}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button>
                          {`Let's Ride`}
                        </Button>
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