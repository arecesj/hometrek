'use client'

import { useRouter } from "next/navigation"
import { Row } from "@tanstack/react-table"
import { taskSchema } from "../data/schema"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Ellipsis } from "lucide-react"
import { manageRouteName, manageRoutes } from "@/constants/routes"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import TaskDialogContent from "./TaskDialogContent"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { categories, statuses } from "../data/data"


interface RowActionsProps<TData> {
  row: Row<TData>
}

export default function RowActions<TData>({
  row,
}: RowActionsProps<TData>) {
  const router = useRouter();
  const currTask  = taskSchema.parse(row.original)
  
  const viewRoute = (category: string) => {
    switch(category) {
      case "lenders":
        return manageRoutes[manageRouteName.LENDERS].route;
      case "inspections":
        return manageRoutes[manageRouteName.INSPECTIONS].route;
      case "appraisals":
        return manageRoutes[manageRouteName.APPRAISALS].route;
      case "insurance":
        return manageRoutes[manageRouteName.INSURANCE].route;
      case "title":
        return manageRoutes[manageRouteName.TITLE].route;
      case "closingday":
        return manageRoutes[manageRouteName.CLOSINGDAY].route;
      default:
        return manageRoutes[manageRouteName.DASHBOARD].route;
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
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              Edit task
            </DropdownMenuItem>
          </DialogTrigger>
          <TaskDialogContent currTask={currTask} />
        </Dialog>
        <DropdownMenuItem onClick={() => {
          router.push(viewRoute(currTask.category))
        }}>
          View page
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
        >
          Mark as done
        </DropdownMenuItem>
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
