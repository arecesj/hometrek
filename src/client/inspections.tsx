export const getInspection = async () => {
  return await fetch(`/api/home_closing/inspections`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createInspection = async (inspections: InspectionsContext) => {
  return await fetch("/api/home_closing/inspections", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inspections)
  })
}

export const updateInspection = async (inspections: InspectionsContext) => {
  return await fetch(`/api/home_closing/inspections/${inspections?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(inspections)
  })

}

export const deleteInspection = async (id: string) => {
  return await fetch(`/api/home_closing/inspections/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}