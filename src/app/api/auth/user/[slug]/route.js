import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  const body = await request.json()
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const userID = params.slug
  try {
    const isExistingUser = await prisma.user.findUnique({
      where: {
        id: userID
      }
    })
    if(!isExistingUser) {
      return NextResponse.json({ message: "This user does not exist." }, { status: 400 });
    }

    await prisma.user.delete({
      where: {
        id: userID
      }
    })

    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    return NextResponse.json({ message: "Unable to delete the user at this time." }, { status: 500 });
  }
}