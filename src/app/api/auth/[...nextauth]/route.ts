import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/config/database/setup";
import { users } from "@/server/users/userSchema";
import { eq } from "drizzle-orm";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        if (!user.email || !user.name) {
          return false;
        }

        const existingUser = await db.query.users.findFirst({
          where: eq(users.email, user.email),
        });

        if (!existingUser) {
          const createdUser = await db
            .insert(users)
            .values({
              email: user.email,
              name: user.name,
              profilePictureUrl: user.image,
            })
            .returning();

          console.log({ createdUser });
        }

        return true;
      } catch (e) {
        console.error("SignInCallBackError::", e);
        return false;
      }
    },

    async session({ session }) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, session.user.email),
      });

      if (!dbUser || !session.user) {
        throw new Error("Invalid session. User not found!");
      }

      Object.assign(session.user, { id: dbUser.id });

      return session;
    },
  },
  // debug: process.env.NODE_ENV !== 'production',
};

export const GET = NextAuth(authOptions);

export const POST = GET;
