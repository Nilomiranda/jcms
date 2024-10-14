import { serverSessionGuard } from "@/app/shared/guards/serverSessionGuard";
import { sessionUser } from "@/app/shared/sessionHelpers";

export const userGuard = async () => {
  await serverSessionGuard({ shouldRedirect: true });
  const user = (await sessionUser())!;

  return user;
};
