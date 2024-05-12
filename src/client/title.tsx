export const getTitle = async () => {
  return await fetch(`/api/home_closing/title`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createTitle = async (title: TitleContext) => {
  return await fetch("/api/home_closing/title", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(title)
  })
}

export const updateTitle = async (title: TitleContext) => {
  return await fetch(`/api/home_closing/title/${title?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(title)
  })
}

export const deleteTitle = async (id: string) => {
  return await fetch(`/api/home_closing/title/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}