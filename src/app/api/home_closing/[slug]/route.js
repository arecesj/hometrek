import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        id
      }
    })

    if(!homeClosing) {
      return NextResponse.json({ message: "This user does not have any home closing information." }, { status: 400 });
    }

    return NextResponse.json({ homeClosing, message: "Successfully retrieved user's home closing information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to retrieve the user's home closing information at this time." }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PUT(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const id = params.slug
  const body = await request.json()

  try {
    await prisma.homeClosing.update({
      data: {
        ...body
      },
      where: {
        id
      },
    })
  } catch (error) {
    
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
    const isExistingHC = await prisma.homeClosing.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingHC) {
      return NextResponse.json({ message: "This user does not have home closing information." }, { status: 400 });
    }

    await prisma.homeClosing.delete({
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