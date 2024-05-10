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