export const getClosingDay = async () => {
  return await fetch(`/api/home_closing/closing_day`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createClosingDay = async (closingDay: ClosingDayContext) => {
  return await fetch("/api/home_closing/closing_day", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(closingDay)
  })
}

export const updateClosingDay = async (closingDay: ClosingDayContext) => {
  return await fetch(`/api/home_closing/closing_day/${closingDay?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(closingDay)
  })
}

export const deleteClosingDay = async (id: string) => {
  return await fetch(`/api/home_closing/closing_day/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}