import { NextResponse } from "next/server";

// To handle a GET request to /api
export async function GET(request) {
  // Do whatever you want
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
export async function POST(request) {
  console.log("DO WE MAKE IT?")
  // const body = JSON.parse(request.body)
  console.log("body: ", body)
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}