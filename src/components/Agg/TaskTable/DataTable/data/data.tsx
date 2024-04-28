import { ArrowDown, ArrowRight, ArrowUp, Circle, CircleCheck, CircleHelp, CircleX, HandCoins, Handshake, NotebookPen, ScrollText, Shield, Timer, UserRoundSearch } from "lucide-react"

export const labels = [
  {
    value: "lenders",
    label: "Lenders",
  },
  {
    value: "inspections",
    label: "Inpsections",
  },
  {
    value: "appraisals",
    label: "Appraisals",
  },
  {
    value: "homeinsurance",
    label: "Home Insurance",
  },
  {
    value: "title",
    label: "Title",
  },
  {
    value: "closingday",
    label: "Closing Day",
  },
]

export const statuses = [
  {
    value: "blocked",
    label: "Blocked",
    icon: CircleHelp,
  },
  {
    value: "todo",
    label: "To do",
    icon: Circle,
  },
  {
    value: "inprogress",
    label: "In Progress",
    icon: Timer,
  },
  {
    value: "done",
    label: "Done",
    icon: CircleCheck,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CircleX,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRight,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUp,
  },
]

export const categories = [
  {
    label: "Lenders",
    value: "lenders",
    icon: HandCoins,
  },
  {
    label: "Inpsections",
    value: "inspections",
    icon: UserRoundSearch,
  },
  {
    label: "Appraisals",
    value: "appraisals",
    icon: NotebookPen,
  },
  {
    label: "Home Insurance",
    value: "homeinsurance",
    icon: Shield,
  },
  {
    label: "Title",
    value: "title",
    icon: ScrollText,
  },
  {
    label: "Closing Day",
    value: "closingday",
    icon: Handshake,
  },
]
