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

export const getPlaidLiabilities = async (accessToken: string) => {
  return await fetch("/api/plaid/liabilities", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_token: accessToken })
  })
}

/*
More Info: https://plaid.com/docs/api/products/assets/#asset_reportcreate
Example params for the UI when hooking it up
const daysRequested = 60;
const options = {
  client_report_id: '123',
  webhook: 'https://www.example.com',
  user: {
    client_user_id: '7f57eb3d2a9j6480121fx361',
    first_name: 'Jane',
    middle_name: 'Leah',
    last_name: 'Doe',
    ssn: '123-45-6789',
    phone_number: '(555) 123-4567',
    email: 'jane.doe@example.com',
  },
};
const request: AssetReportCreateRequest = {
  access_tokens: [accessToken],
  days_requested,
  options,
};
*/

export const createPlaidAssetReport = async (accessToken: string) => {
  return await fetch("/api/plaid/assets/create", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ access_tokens: [accessToken] })
  })
}