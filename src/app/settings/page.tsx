import { Settings } from "./components/Settings";
import { db } from "@/config/database/setup";
import { eq } from "drizzle-orm";
import { ApiKey, apiKeys } from "@/server/apiKeys/apiKeySchema";
import { User } from "@/server/users/userSchema";
import { userGuard } from "@/app/shared/guards/userSessionGuard";

const getUserApiKeys = async (user: User) => {
  const userApiKey: ApiKey | undefined = await db.query.apiKeys.findFirst({
    where: eq(apiKeys.userId, user.id),
  });

  return {
    userApiKey,
    cacheTags: ["apiKey"],
  };
};

export default async function SettingsPage() {
  const user = await userGuard();

  const { userApiKey } = await getUserApiKeys(user);

  return <Settings userApiKey={userApiKey} />;
}
