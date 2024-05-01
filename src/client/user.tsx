export const createUser = async (name: string, email: string, password: string) => {
  return await fetch('/api/user', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}