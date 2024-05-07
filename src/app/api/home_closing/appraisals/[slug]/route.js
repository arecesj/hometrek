import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { appraisalValidation } from "@/lib/apiValidations";

// GET
// GET
// GET

export async function GET(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }
  
  const id = params.slug
  try {
    const appraisal = await prisma.appraisal.findUnique({
      where: {
        id
      }
    })

    if(!appraisal) {
      return NextResponse.json({ message: "This user does not have any appraisal information." }, { status: 400 });
    }

    return NextResponse.json({ appraisal, message: "Successfully retrieved user's appraisal information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to retrieve the user's home closing information at this time." }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const id = params.slug
    const body = await request.json()
    const updatedAppraisal = appraisalValidation.parse(body)
    
    const appraisals = await prisma.appraisal.update({
      data: {
        ...updatedAppraisal
      },
      where: {
        id
      },
    })

    return NextResponse.json({ appraisals, message: "Successfully updated user's appraisal information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's appraisal information at this time." }, { status: 500 });
  }
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request, { params }) {
  const session = await getServerSession(authOptions)
  if(!!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const id = params.slug
  try {
    const isExistingAppraisal = await prisma.appraisal.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingAppraisal) {
      return NextResponse.json({ message: "This user does not have any appraisal information." }, { status: 400 });
    }

    await prisma.appraisal.delete({
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