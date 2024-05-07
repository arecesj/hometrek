import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { titleValidation } from "@/lib/apiValidations";

// GET
// GET
// GET

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const id = params.slug
  try {
    const title = await prisma.title.findUnique({
      where: {
        id
      }
    })

    if(!title) {
      return NextResponse.json({ message: "This user does not have any title information." }, { status: 400 });
    }

    return NextResponse.json({ title, message: "Successfully retrieved user's title information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to retrieve the user's home closing information at this time." }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.slug
    const body = await request.json()
    const updatedTitle = titleValidation.parse(body)
    
    const title = await prisma.title.update({
      data: {
        ...updatedTitle
      },
      where: {
        id
      },
    })

    return NextResponse.json({ title, message: "Successfully updated user's title information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to update the user's home closing information at this time." }, { status: 500 });
  }
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = params.slug
  try {
    const isExistingTitle = await prisma.title.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingTitle) {
      return NextResponse.json({ message: "This user does not have any title information." }, { status: 400 });
    }

    await prisma.title.delete({
      where: {
        id
      }
    })

    return new Response(null, {
      status: 204,
    })
  } catch (error) {
    return NextResponse.json({ message: "Unable to delete the user's home closing information at this time." }, { status: 500 });
  }
}