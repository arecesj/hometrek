'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const PotentialSavings = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
      <Card
        className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
      >
        <CardHeader className="pb-3">
          <CardTitle>Potential Savings</CardTitle>
          <CardDescription className="max-w-lg text-balance leading-relaxed">
            Potential calculated savings on HomeTrek
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
            HomeTrek Suggestion
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
  )
}

export default PotentialSavings;