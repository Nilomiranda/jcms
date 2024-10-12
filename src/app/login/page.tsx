import {LoginForm} from "@/app/login/components/LoginForm";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";

export default async function LoginScreen() {
  const session = await getServerSession(authOptions)

  if (session?.user?.id) {
    return redirect('/publish');
  }

  return (
    <LoginForm />
  )
}