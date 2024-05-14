import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { homeClosingValidation, newUserValidation } from "@/lib/apiValidations";

// CREATE
// CREATE
// CREATE

export async function POST(request) {
  try {
    const { user, homeClosing } = await request.json();
    const {
      email,
      name,
      password
    } = newUserValidation.parse(user);
    const {
      state,
      zipCode,
      lenders,
      inspections,
      appraisals,
      insurance,
      title,
      closingDay,
      tasks,
      costs
    } = homeClosingValidation.parse(homeClosing)
    
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

    const newHomeClosing = await prisma.homeClosing.create({
      data: {
        state: state,
        zipCode: zipCode,
        lenders: {
          create: lenders
        },
        inspections: {
          create: inspections
        },
        appraisals: {
          create: appraisals
        },
        insurance: {
          create: insurance
        },
        title: {
          create: title
        },
        closingDay: {
          create: closingDay
        },
        costs: {
          create: costs
        },
        tasks: {
          create: tasks
        },
        user: {
            connect: {
              id: newUser.id
            }
        }
      },
      include: {
        tasks: true,
      },
    })

    const resp = {
      user: { id: newUser.id, email: newUser.email, name: newUser.name },
      homeClosing: { ...newHomeClosing }
    }

    return NextResponse.json({ ...resp, message: "User created successfully"}, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: "There was an internal error" }, { status: 500 });
  }
}
