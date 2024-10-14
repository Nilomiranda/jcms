import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/server/users/userSchema";

export const sessionUser = async (): Promise<User | undefined> => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
