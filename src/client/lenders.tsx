export const getLender = async () => {
  return await fetch(`/api/home_closing/lenders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createLender = async (lenders: LendersContext) => {
  return await fetch("/api/home_closing/lenders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lenders)
  })
}

export const updateLender = async (lenders: LendersContext) => {
  return await fetch(`/api/home_closing/lenders/${lenders?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(lenders)
  })
}

export const deleteLender = async (id: string) => {
  return await fetch(`/api/home_closing/lenders/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}