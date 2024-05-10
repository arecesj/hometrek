import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { taskValidation } from "@/lib/apiValidations";

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
    const task = await prisma.task.findUnique({
      where: {
        id
      }
    })

    if(!task) {
      return NextResponse.json({ message: "This user does not have any task information." }, { status: 400 });
    }

    return NextResponse.json({ task, message: "Successfully retrieved user's task information"}, { status: 200 })
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
    const updatedTask = taskValidation.parse(body)
    
    const task = await prisma.task.update({
      data: {
        ...updatedTask
      },
      where: {
        id
      },
    })

    return NextResponse.json({ task, message: "Successfully updated the task"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to update the task at this time." }, { status: 500 });
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
    const isExistingTask = await prisma.task.findUnique({
      where: {
        id
      }
    })
    
    if(!isExistingTask) {
      return NextResponse.json({ message: "This user does not have any task information." }, { status: 400 });
    }

    await prisma.task.delete({
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