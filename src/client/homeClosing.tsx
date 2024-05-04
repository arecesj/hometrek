export const getHomeClosing = async (userID: string) => {
  return await fetch(`/api/home_closing/${userID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}