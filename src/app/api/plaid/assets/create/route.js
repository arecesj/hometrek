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
/*
More Info: https://plaid.com/docs/api/products/assets/#asset_reportcreate
Example params for the UI when hooking it up
const daysRequested = 60;
const options = {
  client_report_id: '123',
  webhook: 'https://www.example.com',
  // needed for Fannie Mae
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

// To handle a POST request to /api/plaid/assets/create
export async function POST(request) {
  const { access_tokens }  = await request.json()

  return plaidClient.assetReportCreate({ access_tokens }).then(response => {
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