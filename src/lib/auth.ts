import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "juan@hometrek.ai" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          return null
        }
        
        const isExistingUser = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if(!isExistingUser) {
          return null
        }

        const doesPasswordMatch = await compare(credentials.password, isExistingUser.password)
        if(!doesPasswordMatch) {
          return null
        }

        return {
          id: `${isExistingUser.id}`,
          name: isExistingUser.name,
          email: isExistingUser.email,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token }) {
      return token
    },
    async session({ session }) {
      return session
    },
  }
}