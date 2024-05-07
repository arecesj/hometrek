import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { insuranceValidation } from "@/lib/apiValidations";

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
    const insurance = await prisma.insurance.findUnique({
      where: {
        id
      }
    })

    if(!insurance) {
      return NextResponse.json({ message: "This user does not have any insurance information." }, { status: 400 });
    }

    return NextResponse.json({ insurance, message: "Successfully retrieved user's insurance information"}, { status: 200 })
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
    const updatedInsurance = insuranceValidation.parse(body)
    
    const insurance = await prisma.insurance.update({
      data: {
        ...updatedInsurance
      },
      where: {
        id
      },
    })

    return NextResponse.json({ insurance, message: "Successfully updated user's insurance information"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to updated the user's insurance information at this time." }, { status: 500 });
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
    const isExistingInsurance = await prisma.insurance.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingInsurance) {
      return NextResponse.json({ message: "This user does not have any insurance information." }, { status: 400 });
    }

    await prisma.insurance.delete({
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