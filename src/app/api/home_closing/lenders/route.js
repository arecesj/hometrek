import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { lenderValidation } from "@/lib/apiValidations";

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

    if(!homeClosing?.lenders) {
      return NextResponse.json({ message: "The user has no lender information" }, { status: 404 });
    }
    const lenders = homeClosing?.lenders
    return NextResponse.json({lenders, message: "Successfully retrieves user's lenders information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}

// POST
// POST
// POST

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  try {
    const user_id = session.user?.id
    const body = await request.json();
    const newLender = lenderValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        user_id
      }
    })
    
    const lenders = await prisma.lender.create({
      data: {
        ...newLender,
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({lenders, message: "Successfully created user lender information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add lender information at this time." }, { status: 500 });
  }
}