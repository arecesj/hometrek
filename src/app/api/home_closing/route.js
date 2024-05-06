import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"

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

  const body = await request.json();
  
  try {
    const homeClosing = await prisma.homeClosing.create({
      data: {
        state: body.state,
        zipCode: body.zipCode,
        lenders: {
          create: {
            ...body.lenders
          }
        },
        inspections: {
          create: {
            ...body.inspections
          }
        } ,
        appraisals: {
          create: {
            ...body.appraisals
          }
        },
        insurance: {
          create: {
            ...body.insurance
          }
        },
        title: {
          create: {
            ...body.title
          }
        },
        closingDay: {
          create: {
            ...body.closingDay
          }
        },
        tasks: {
          create: {
            ...body.tasks
          }
        },
        costs: {
          create: {
            ...body.costs
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