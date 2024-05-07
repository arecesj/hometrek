import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"

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
    const lender = await prisma.lender.findUnique({
      where: {
        id
      }
    })

    if(!lender) {
      return NextResponse.json({ message: "This user does not have any lender information." }, { status: 400 });
    }

    return NextResponse.json({ lender, message: "Successfully retrieved user's lender information"}, { status: 200 })
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
  const oldLender = await prisma.lenders.findUnique({
    where: {
      id
    }
  })
  const lender = await prisma.lender.update({
    data: {
      ...oldLender,
      ...body
    },
    where: {
      id
    },
  })

  return NextResponse.json({ lender, message: "Successfully retrieved user's lender information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to delete the user's home closing information at this time." }, { status: 500 });
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
    const isExistingLender = await prisma.lender.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingLender) {
      return NextResponse.json({ message: "This user does not have any lender information." }, { status: 400 });
    }

    await prisma.lender.delete({
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