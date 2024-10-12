import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export const serverSessionGuard = async ({ shouldRedirect, ifLoggedInRedirectTo }: { shouldRedirect: boolean, ifLoggedInRedirectTo?: string }) => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.id && shouldRedirect) {
    return redirect('/login');
  }

  if (session?.user && ifLoggedInRedirectTo) {
    return redirect(ifLoggedInRedirectTo)
  }
}