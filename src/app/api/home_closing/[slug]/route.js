import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { homeclosingValidation } from "@/lib/apiValidations";

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

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.slug
    const body = await request.json()
    const updatedHomeClosing = homeclosingValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.update({
      data: {
        ...updatedHomeClosing
      },
      where: {
        id
      },
    })

    return NextResponse.json({ homeClosing, message: "Successfully updated user's home closing information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's home closing information at this time." }, { status: 500 });
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