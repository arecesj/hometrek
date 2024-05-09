export const createUser = async (user: { name?: string, email?: string, password?: string }, homeClosing: HomeClosingContext) => {
  return await fetch('/api/auth/user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ user, homeClosing })
  })
}