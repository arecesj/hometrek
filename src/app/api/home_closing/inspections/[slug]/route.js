import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { inspectionValidation } from "@/lib/apiValidations";

// GET
// GET
// GET

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const id = params.slug
  try {
    const inspection = await prisma.inspection.findUnique({
      where: {
        id
      }
    })

    if(!inspection) {
      return NextResponse.json({ message: "This user does not have any inspection information." }, { status: 400 });
    }

    return NextResponse.json({ inspection, message: "Successfully retrieved user's inspection information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to retrieve the user's home closing information at this time." }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.slug
    const body = await request.json()
    const updatedInspection = inspectionValidation.parse(body)
    
    const inspections = await prisma.inspection.update({
      data: {
        ...updatedInspection,
        inspectionDetails: {
          update: {
            ...updatedInspection.inspectionDetails
          }
        }
      },
      where: {
        id
      },
      include: {
        inspectionDetails: true
      }
    })

    return NextResponse.json({ inspections, message: "Successfully updated user's inspection information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's inspection information at this time." }, { status: 500 });
  }
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = params.slug
  try {
    const isExistingInspection = await prisma.inspection.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingInspection) {
      return NextResponse.json({ message: "This user does not have any inspection information." }, { status: 400 });
    }

    await prisma.inspection.delete({
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