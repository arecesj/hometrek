import { NextResponse } from "next/server";

// To handle a GET request to /api/canopy/[slug]
export async function GET(request, { params }) {  
  const pullId = params.slug
  try {
    // const resp = await fetch(`https://app.usecanopy.com/api/v1.0.0/teams/${process.env.CANOPY_TEAM_ID}/pulls/${pullId}`, {
    const resp = await fetch(`https://app.usecanopy.com/api/v1.0.0/teams/b7570e3e-3b39-44e3-8081-9a30d7d8b29e/pulls/${pullId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        // 'x-canopy-client-id': process.env.CANOPY_CLIENT_ID,
        // 'x-canopy-client-secret': process.env.CANOPY_CLIENT_SECRET,
        'x-canopy-client-id': '18c235bc-2268-40a5-9aa8-34748f2c8bc8',
        'x-canopy-client-secret': 'TEmPsu8GgZv4uSmxysdOoDKsIfzGt2o82cmkkjWIiqMPGcjQfCTAWRNB+AiUlkLp',
      },
      
    })

    const body = await resp.json()
    if (body.success) {
      const { pull } = body
      return NextResponse.json({ pull, message: "Successfully retrieved user's insurance information"}, { status: 200 })
    } else {
      return NextResponse.json({ message: "Unable to connect to canopy at this time." }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Unable to connect to canopy at this time." }, { status: 500 });
  }
}

// To handle a POST request to /api/canopy
export async function POST(request) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}
