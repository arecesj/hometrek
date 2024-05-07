import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"

// GET
// GET
// GET

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const user_id = session.user?.id
  try {
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        user_id
      }
    })

    if(!homeClosing?.inspections) {
      return NextResponse.json({ message: "The user has no inspection information" }, { status: 404 });
    }
    const inspection = homeClosing?.inspection
    return NextResponse.json({inspection, message: "Successfully retrieves user's inspection information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}