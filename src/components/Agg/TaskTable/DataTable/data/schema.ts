import { z } from "zod"

export const taskSchema = z.object({
  category: z.string(),
  task: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>
