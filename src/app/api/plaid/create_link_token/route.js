import { Configuration, PlaidApi, PlaidEnvironments, Products } from 'plaid';
import { NextResponse } from "next/server";
import { Environments, URL } from "@/constants/environments";

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
const products = [Products.Liabilities, Products.Auth]

// To handle a POST request to /api/plaid/create_link_token
export async function POST(request) {
  const isProd = process.env.NODE_ENV === Environments.PROD;
  console.log("IS PROD: ", isProd)
  
  const plaidRequest = {
    user: {
      // This should correspond to a unique id for the current user.
      client_user_id: 'user',
    },
    client_name: isProd ? "HomeTrek" : "HomeTrek Dev App",
    products: products,
    language: 'en',
    redirect_uri: isProd ? URL.PROD : URL.DEV,
    country_codes: ['US'],
  };

  return plaidClient.linkTokenCreate(plaidRequest).then(response => {
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