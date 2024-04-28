'use client'

import { useRouter } from "next/navigation"
import { Row } from "@tanstack/react-table"
import { taskSchema } from "../data/schema"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { aggRouteName, aggRoutes } from "@/constants/routes"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { categories, statuses } from "../data/data"


interface RowActionsProps<TData> {
  row: Row<TData>
}

export default function RowActions<TData>({
  row,
}: RowActionsProps<TData>) {
  const router = useRouter();
  const { category } = taskSchema.parse(row.original)
  
  const editRoute = (category: string) => {
    switch(category) {
      case "lenders":
        return aggRoutes[aggRouteName.LENDERS].route;
      case "inspections":
        return aggRoutes[aggRouteName.INSPECTIONS].route;
      case "appraisals":
        return aggRoutes[aggRouteName.APPRAISALS].route;
      case "insurance":
        return aggRoutes[aggRouteName.INSURANCE].route;
      case "title":
        return aggRoutes[aggRouteName.TITLE].route;
      case "closingday":
        return aggRoutes[aggRouteName.CLOSINGDAY].route;
      default:
        return aggRoutes[aggRouteName.DASHBOARD].route;
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <Ellipsis className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={() => {
          router.push(editRoute(category))
        }}>Edit / View </DropdownMenuItem>
        <DropdownMenuItem>Mark as done</DropdownMenuItem>
        {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.status}>
              {statuses.map((status) => (
                <DropdownMenuRadioItem key={status.value} value={status.value}>
                  {status.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Categories</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={task.category}>
              {categories.map((category) => (
                <DropdownMenuRadioItem key={category.value} value={category.value}>
                  {category.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub> */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
