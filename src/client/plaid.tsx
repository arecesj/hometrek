export const getPlaidLinkToken = async () => {
  return await fetch("/api/plaid/create_link_token", { method: 'POST' });
}

export const getPlaidAccessToken = async (publicToken: string) => {
  return await fetch("/api/plaid/exchange_public_token", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ public_token: publicToken })
  });
}

export const getPlaidAccounts = async (accessToken: string) => {
  return await fetch("/api/plaid/accounts", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: accessToken })
  })
}
