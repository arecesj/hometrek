import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { insuranceValidation } from "@/lib/apiValidations";

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
      }
    })

    if(!homeClosing?.insurance) {
      return NextResponse.json({ message: "The user has no insurance information" }, { status: 404 });
    }
    const insurance = homeClosing?.insurance
    return NextResponse.json({insurance, message: "Successfully retrieves user's insurance information"}, { status: 200 })
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
    const newInsurance = insuranceValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })

    const insurance = await prisma.insurance.create({
      data: {
        ...newInsurance,
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({insurance, message: "Successfully created user insurance information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add insurance information at this time." }, { status: 500 });
  }
}