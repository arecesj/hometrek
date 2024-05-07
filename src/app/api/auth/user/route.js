import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { newUserValidation } from "@/lib/apiValidations";

// CREATE
// CREATE
// CREATE

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, name, password } = newUserValidation.parse(body);
    
    const isExistingUser = await prisma.user.findUnique({
      where: { email }
    })
    
    if(isExistingUser) {
      return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409 })
    }
    
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      }
    })
    
    const hashedPassword = await hash(password, 10)
    await prisma.account.create({
      data: {
        type: "credentials",
        password: hashedPassword,
        user: {
          connect: {
            email
          }
        }
      }
    })

    return NextResponse.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name }, message: "User created successfully"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "There was an internal error" }, { status: 500 });
  }
}
