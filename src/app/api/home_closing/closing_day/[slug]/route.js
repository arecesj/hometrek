import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { closingDayValidation } from "@/lib/apiValidations";

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
    const closingDay = await prisma.closingDay.findUnique({
      where: {
        id
      }
    })

    if(!closingDay) {
      return NextResponse.json({ message: "This user does not have any closingDay information." }, { status: 400 });
    }

    return NextResponse.json({ closingDay, message: "Successfully retrieved user's closing day information"}, { status: 200 })
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
    const updatedClosingDay = closingDayValidation.parse(body)
    
    const closingDay = await prisma.closingDay.update({
      data: {
        ...updatedClosingDay
      },
      where: {
        id
      },
    })

    return NextResponse.json({ closingDay, message: "Successfully updated user's closing day information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's closing day information at this time." }, { status: 500 });
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
    const isExistingClosingDay = await prisma.closingDay.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingClosingDay) {
      return NextResponse.json({ message: "This user does not have any closing day information." }, { status: 400 });
    }

    await prisma.closingDay.delete({
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