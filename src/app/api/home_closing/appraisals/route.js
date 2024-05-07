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

    if(!homeClosing?.appraisals) {
      return NextResponse.json({ message: "The user has no appraisal information" }, { status: 404 });
    }
    const appraisals = homeClosing?.appraisals
    return NextResponse.json({appraisals, message: "Successfully retrieves user's appraisals information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}