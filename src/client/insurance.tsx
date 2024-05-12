export const getInsurance = async () => {
  return await fetch(`/api/home_closing/insurance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createInsurance = async (insurance: InsuranceContext) => {
  return await fetch("/api/home_closing/insurance", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(insurance)
  })
}

export const updateInsurance = async (insurance: InsuranceContext) => {
  return await fetch(`/api/home_closing/insurance/${insurance?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(insurance)
  })
}

export const deleteInsurance = async (id: string) => {
  return await fetch(`/api/home_closing/insurance/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}