import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  category: z.string(),
  task: z.string(),
  status: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>
