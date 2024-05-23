export const getCanopyPull = async (pullId: string) => {
  return await fetch(`/api/canopy/${pullId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
}