import { NextResponse } from "next/server";
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth"
import { taskValidation } from "@/lib/apiValidations";

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
      }
    })

    if(!homeClosing?.tasks) {
      return NextResponse.json({ message: "The user has no tasks" }, { status: 404 });
    }
    const tasks = homeClosing?.tasks
    return NextResponse.json({tasks, message: "Successfully retrieves user's tasks"}, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to get the user's home closing information at this time." }, { status: 500 });
  }
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request) {
  const session = await getServerSession(authOptions)
  if(!session) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const userId = session.user?.id
  try {
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })

    await prisma.task.deleteMany({
      where: {
        home_closing_id: homeClosing.id
      }
    })

    return new Response(null, {
      status: 204,
    })
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
    const newTask = taskValidation.parse(body)
    
    const homeClosing = await prisma.homeClosing.findUnique({
      where: {
        userId
      }
    })
    
    const task = await prisma.task.create({
      data: {
        ...newTask,
        homeClosing: {
            connect: {
              id: homeClosing.id
            }
        }
      },
    })

    return NextResponse.json({task, message: "Successfully created a new task"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "Unable to create task at this time." }, { status: 500 });
  }
}