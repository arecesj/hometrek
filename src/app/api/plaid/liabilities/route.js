import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { NextResponse } from "next/server";

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration)

// To handle a POST request to /api/plaid/liabilities
export async function POST(request) {
  const { access_token }  = await request.json()

  return plaidClient.liabilitiesGet({ access_token }).then(response => {
    return NextResponse.json(response.data, { status: response.statusCode });
  }).catch(e => {
    console.error(e)
    return NextResponse.json(
      {
        "message": "There was an issue processing the request"
      },
      {
        status: 500
      }
    );
  })
}
