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
        
        const { id, name, email, password } = isExistingUser
        const doPasswordsMatch = await compare(credentials.password, password)
        if(!doPasswordsMatch) {
          return null
        }

        return {
          id,
          name,
          email,
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user?.id
        }
      }
      return token
    },
    async session({ session, user, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token?.id
        }
      }
    },
  }
}