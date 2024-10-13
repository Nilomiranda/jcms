import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";
import {sessionUser} from "@/app/shared/sessionHelpers";

export const userGuard = async () => {
  const hasUser = await serverSessionGuard({ shouldRedirect: true })

  if (hasUser) {
    return sessionUser();
  }

  return null;
}