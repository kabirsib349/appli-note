import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "./db"

export const authOptions : NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
      issuer: "https://github.com/login/oauth",
      allowDangerousEmailAccountLinking: true,
    })
  ],
  callbacks: {
    session: async ({ session, user }) => {
     // console.log(session, user);
      if(session.user) {
        session.user.id = user.id
      }
      return session
    }
  }
}

export default NextAuth(authOptions)