// CREATE
// CREATE
// CREATE

import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod"


const newUserValidation = z
  .object({
    name: z.string().min(3, "Name is required").max(100),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z.string().min(1, "Password is required").min(7, "Password must have at least 7 characters")
  })


export async function POST(request) {
  console.log("HI!")
  try {
    const body = await request.json();
    const { email, name, password } = newUserValidation.parse(body);
    
    const isExistingUser = await prisma.user.findUnique({
      where: { email: email }
    })

    if(isExistingUser) {
      return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 })
    }

    const hashedPassword = await hash(password, 10)

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword
      }
    })

    return NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, message: "User created successfully"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "There was an internal error" }, { status: 500 });
  }
}

// UPDATE
// UPDATE
// UPDATE

export async function PATCH(request) {
  // const body = JSON.parse(request.body)
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// DELETE
// DELETE
// DELETE

export async function DELETE(request) {
  // const body = JSON.parse(request.body)
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}