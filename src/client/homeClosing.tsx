export const getHomeClosing = async (userID: string) => {
  return await fetch(`/api/home_closing/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createHomeClosing = async (userId: string, homeClosingContext: HomeClosingContext) => {
  return await fetch('/api/home_closing', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, homeClosingContext })
  })
}