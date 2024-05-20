import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { appraisalValidation } from "@/lib/apiValidations";

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
        appraisals: {
          include: {
            include: {
              appraisalDetails: true
            }
          }
        }
      }
    })

    if(!homeClosing?.appraisals) {
      return NextResponse.json({ message: "The user has no appraisal information" }, { status: 404 });
    }
    const appraisals = homeClosing?.appraisals
    return NextResponse.json({appraisals, message: "Successfully retrieves user's appraisals information"}, { status: 200 })
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
    const newAppraisal = appraisalValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })
    
    const appraisals = await prisma.appraisal.create({
      data: {
        ...newAppraisal,
        appraisalDetails: {
          create: {
            ...newAppraisal.appraisalDetails
          }
        },
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({appraisals, message: "Successfully created user appraisal information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add appraisal information at this time." }, { status: 500 });
  }
}