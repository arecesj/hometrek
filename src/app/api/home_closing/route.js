import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { homeClosingValidation } from "@/lib/apiValidations"

// GET
// GET
// GET

export async function GET(request) {
  const session = await getServerSession(authOptions)
  if(!session) {
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
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  try {
    const body = await request.json();
    const newHomeClosing = homeClosingValidation.parse(body)
    const user = await prisma.user.findUnique({
      where: {
        id: body.userId
      },
    })
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
        // This needs to be email since it's @unique
        user: {
          connect: {
            email: user.email
          }
      }
      },
    })

    return NextResponse.json({homeClosing, message: "Successfully created user home closing information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add the home closing information at this time." }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json()
    const userId = body.userId
    let updatedHomeClosing = homeClosingValidation.parse(body.homeClosingContext)
    updatedHomeClosing = {...updatedHomeClosing, tasks: {
      create: updatedHomeClosing.tasks
    }}
    
    const homeClosing = await prisma.homeClosing.update({
      data: {
        ...updatedHomeClosing
      },
      where: {
        userId
      },
    })

    return NextResponse.json({ homeClosing, message: "Successfully updated user's home closing information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's home closing information at this time." }, { status: 500 });
  }
}
