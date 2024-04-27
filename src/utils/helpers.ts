export const formatToUSD = (s: string) => {
  const amount = parseFloat(s)
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export const subtractNumStrings = (ns1: string, ns2: string) => {
  const sub = parseFloat(ns1) - parseFloat(ns2)
  return sub.toString()
}
