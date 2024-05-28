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
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const userId = session.user?.id
  try {
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      },
      include: {
        lenders: {
          include: {
            mortgageDetails: true
          }
        }
      }
    })

    if(!homeClosing?.lenders) {
      return NextResponse.json({ message: "The user has no lender information" }, { status: 200 });
    }
    const lenders = homeClosing?.lenders
    return NextResponse.json({lenders, message: "Successfully retrieved user's lenders information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}

// POST
// POST
// POST

export async function POST(request) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  try {
    const userId = session.user?.id
    const body = await request.json();
    const newLender = lenderValidation.parse(body)
    
    /*
    the other way of doing this is directly updating homeClosing
    however, im not sure about the relational fields so rather break it out into its own steps for now
    not opposed to refactoring if another way is more performant
    
    await prisma.homeClosing.update({
      where: {
        userId
      },
      data: {
        lenders: newLender
      }
    })
    */
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      },
    })
    
    const formattedNewLender = {
      hasOwnLender: newLender.hasOwnLender,
      plaidAccessToken: newLender.plaidAccessToken,
      mortgageDetails: {
        create: {
          ...newLender.mortgageDetails
        }
      }
    }
    
    const lenders = await prisma.lender.create({
      data: {
        ...formattedNewLender,
        homeClosing: {
          connect: {
            id: homeClosing.id
          }
        }
      },
      include: {
        mortgageDetails: true
      }
    })

    return NextResponse.json({lenders, message: "Successfully created user lender information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add lender information at this time." }, { status: 500 });
  }
}