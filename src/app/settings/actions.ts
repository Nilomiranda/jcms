'use server'

import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";
import {sessionUser} from "@/app/shared/sessionHelpers";
import {db} from "@/config/database/setup";
import {apiKeys} from "@/server/apiKeys/apiKeySchema";
import {users} from "@/server/users/userSchema";
import {createId} from "@paralleldrive/cuid2";
import * as bcrypt from "bcrypt";

interface GenerateApiKeyInput {
  name: string;
}

export const generateApiKey = async ({ name }: GenerateApiKeyInput) => {
  console.log({name})
  try {
    await serverSessionGuard({ shouldRedirect: true })
    const value = createId()

    const encryptedValue = await bcrypt.hash(value, 12);

    const user = (await sessionUser())!

    const [apiKey] = await db.insert(apiKeys).values({
      name,
      userId: user.id,
      value: encryptedValue,
    }).onConflictDoUpdate({
      target: apiKeys.userId,
      set: { name, value: encryptedValue }
    }).returning()

    if (apiKey.id) {
      return value;
    }

    return '';
  } catch (e) {
    console.error('GenerateApiKeyError:: ', e)
  }
}