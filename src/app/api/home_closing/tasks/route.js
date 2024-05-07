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

  const id = session.user?.id
  try {
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        id
      }
    })

    if(!homeClosing?.tasks) {
      return NextResponse.json({ message: "The user has no tasks" }, { status: 404 });
    }
    const tasks = homeClosing?.tasks
    return NextResponse.json({tasks, message: "Successfully retrieves user's tasks"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}