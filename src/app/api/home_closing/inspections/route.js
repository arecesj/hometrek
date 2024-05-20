import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { inspectionValidation } from "@/lib/apiValidations";

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
        inspections: {
          include: {
            inspectionDetails: true
          }
        }
      }
    })

    if(!homeClosing?.inspections) {
      return NextResponse.json({ message: "The user has no inspection information" }, { status: 404 });
    }
    const inspection = homeClosing?.inspection
    return NextResponse.json({inspection, message: "Successfully retrieves user's inspection information"}, { status: 200 })
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
    const newInspection = inspectionValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })

    const formattedNewInspection = {
      hasInspector: newInspection.hasInspector,
      hasInspected: newInspection.hasInspected,
      inspectionDetails: {
        create: {
          ...newInspection.inspectionDetails
        }
      }
    }
    
    const inspections = await prisma.inspection.create({
      data: {
        ...formattedNewInspection,
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({inspections, message: "Successfully created user inspection information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add inspection information at this time." }, { status: 500 });
  }
}