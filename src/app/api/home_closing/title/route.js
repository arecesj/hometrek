import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { titleValidation } from "@/lib/apiValidations";

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
        title: {
          include: {
            titleDetails: true
          }
        }
      }
    })

    if(!homeClosing?.title) {
      return NextResponse.json({ message: "The user has no title information" }, { status: 404 });
    }
    const title = homeClosing?.title
    return NextResponse.json({title, message: "Successfully retrieves user's title information"}, { status: 200 })
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
    const newTitle = titleValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })
    
    const title = await prisma.title.create({
      data: {
        ...newTitle,
        titleDetails: {
          create: {
            ...newTitle.titleDetails
          }
        },
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({title, message: "Successfully created user title information"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to add title information at this time." }, { status: 500 });
  }
}