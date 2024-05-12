export const getAppraisal = async () => {
  return await fetch(`/api/home_closing/appraisals`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

export const createAppraisal = async (appraisals: AppraisalsContext) => {
  return await fetch("/api/home_closing/appraisals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appraisals)
  })
}

export const updateAppraisal = async (appraisals: AppraisalsContext) => {
  return await fetch(`/api/home_closing/appraisals/${appraisals?.id ?? ""}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(appraisals)
  })
}

export const deleteAppraisal = async (id: string) => {
  return await fetch(`/api/home_closing/appraisals/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
}