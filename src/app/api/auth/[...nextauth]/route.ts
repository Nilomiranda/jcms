import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

console.log('process.env.GOOGLE_CLIENT_ID', process.env.GOOGLE_CLIENT_ID)
console.log('process.env.GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET)

export const GET = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid profile email',
        }
      }
    }),
  ],
  debug: process.env.NODE_ENV !== 'production',
});

export const POST = GET;
