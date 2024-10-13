import {Settings} from  './components/Settings'
import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";
import {sessionUser} from "@/app/shared/sessionHelpers";
import {db} from "@/config/database/setup";
import {eq} from "drizzle-orm";
import {ApiKey, apiKeys} from "@/server/apiKeys/apiKeySchema";

export default async function SettingsPage() {
  await serverSessionGuard({ shouldRedirect: true })
  const user = (await sessionUser())!

  const userApiKey: ApiKey | undefined = await db.query.apiKeys.findFirst({
    where: eq(apiKeys.userId, user.id)
  });

  return (
    <Settings userApiKey={userApiKey} />
  )
}