import { NextResponse } from "next/server";

// To handle a GET request to /api/title
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api/title
export async function POST(request) {

  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}