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

// To handle a POST request to /api/plaid/exchange_public_token
export async function POST(request) {
  const { public_token }  = await request.json()

  return plaidClient.itemPublicTokenExchange({ public_token }).then(response => {
    console.log("RESP: ", response)
    return NextResponse.json(response.data, { status: response.statusCode });
  }).catch(e => {
    console.log(e)
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