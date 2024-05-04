import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
  try {
    await prisma.user.delete({
      where: {
        id: params.slug
      }
    })

    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    console.log("ERROR: ", error)
    return NextResponse.json({ message: "Unable to delete the user at this time." }, { status: 500 });
  }
}