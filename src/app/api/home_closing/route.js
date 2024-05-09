import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { homeClosingValidation } from "@/lib/apiValidations";

// GET
// GET
// GET

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const id = session.user?.id
  try {
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        id
      }
    })

    return NextResponse.json({homeClosing, message: "Successfully retrieves user home closing information"}, { status: 200 })
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
    const body = await request.json();
    const newHomeClosing = homeClosingValidation.parse(body)
    const homeClosing = await prisma.homeClosing.create({
      data: {
        state: newHomeClosing.state,
        zipCode: newHomeClosing.zipCode,
        lenders: {
          create: {
            ...newHomeClosing.lenders
          }
        },
        inspections: {
          create: {
            ...newHomeClosing.inspections
          }
        } ,
        appraisals: {
          create: {
            ...newHomeClosing.appraisals
          }
        },
        insurance: {
          create: {
            ...newHomeClosing.insurance
          }
        },
        title: {
          create: {
            ...newHomeClosing.title
          }
        },
        closingDay: {
          create: {
            ...newHomeClosing.closingDay
          }
        },
        tasks: {
          create: newHomeClosing.tasks
        },
        costs: {
          create: {
            ...newHomeClosing.costs
          }
        },
        user: {
            connect: {
              id: body.userId
            }
        }
      },
    })

    return NextResponse.json({homeClosing, message: "Successfully created user home closing information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add the home closing information at this time." }, { status: 500 });
  }
}