'use strict'

import { NextResponse } from "next/server";

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

// To handle a GET request to /api/inspections
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api/inspections
export async function POST(request) {
  const data = await request.json();

  return client.search({
    term: 'Home Inspection',
    location: data.zipCode,
    sort_by: 'best_match',
    limit: 5,
    radius: 16000,
  }).then(response => {
    return NextResponse.json(response.jsonBody, { status: response.statusCode });
  }).catch(e => {
    console.log(e);
    return NextResponse.json(
      {
        "message": "There was an issue processing the request"
      },
      {
        status: 500
      }
    );
  });
}