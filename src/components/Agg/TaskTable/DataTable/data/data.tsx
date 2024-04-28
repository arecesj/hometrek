import { ArrowDown, ArrowRight, ArrowUp, Circle, CircleCheck, CircleHelp, CircleX, HandCoins, Handshake, NotebookPen, ScrollText, Shield, Timer, UserRoundSearch } from "lucide-react"

export const categories = [
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
