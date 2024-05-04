import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";


// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request, { params }) {
  // const body = JSON.parse(request.body)
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
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