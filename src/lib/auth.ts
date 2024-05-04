import { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prisma"
import { compare } from "bcrypt"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
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
        
        const { id, name, email } = isExistingUser

        const hasAccount = await prisma.account.findFirst({
          where: {
            userId: id
          }
        })
        
        if(!hasAccount || !hasAccount?.password) {
          return null
        }
        
        const { password } = hasAccount
        const doPasswordsMatch = await compare(credentials.password, password)
        
        if(!doPasswordsMatch) {
          return null
        }

        return {
          id,
          accountID: hasAccount.id,
          name,
          email,
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      if (user) {
        if(isNewUser && account.provider === "google") {
          await prisma.homeClosing.create({
            data: {
              user: {
                connect: {
                  email: user.email
                }
              }
            }
          })
        }
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

export const isUserAuthorized = async () => {
  const session = await getServerSession(authOptions)
  return !!session
}
