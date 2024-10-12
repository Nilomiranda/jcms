import {LoginForm} from "@/app/login/components/LoginForm";
import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";

export default async function LoginScreen() {
  await serverSessionGuard({ shouldRedirect: false, ifLoggedInRedirectTo: '/publish' })

  return (
    <LoginForm />
  )
}