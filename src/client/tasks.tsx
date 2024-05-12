export const getTask = async () => {
  return await fetch(`/api/home_closing/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createTask = async (task: TaskContext) => {
  return await fetch("/api/home_closing/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
}

export const updateTask = async (task: TaskContext) => {
  return await fetch(`/api/home_closing/tasks/${task?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(task)
  })
}

export const deleteTask = async (id: string) => {
  return await fetch(`/api/home_closing/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}