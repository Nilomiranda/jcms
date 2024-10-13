'use server'

import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";
import {sessionUser} from "@/app/shared/sessionHelpers";
import {db} from "@/config/database/setup";
import {apiKeys} from "@/server/apiKeys/apiKeySchema";
import {createId} from "@paralleldrive/cuid2";
import * as bcrypt from "bcrypt";
import {userGuard} from "@/app/shared/guards/userSessionGuard";
import {and, eq} from "drizzle-orm";
import {revalidateTag} from "next/cache";

interface GenerateApiKeyInput {
  name: string;
}

export const generateApiKey = async ({ name }: GenerateApiKeyInput) => {
  const user = await userGuard();

  try {
    const value = createId()

    const encryptedValue = await bcrypt.hash(value, 12);

    const [apiKey] = await db.insert(apiKeys).values({
      name,
      userId: user.id,
      value: encryptedValue,
    }).onConflictDoUpdate({
      target: apiKeys.userId,
      set: { name, value: encryptedValue }
    }).returning()

    if (apiKey.id) {
      revalidateTag('apiKey')
      return value;
    }

    revalidateTag('apiKey')
    return '';
  } catch (e) {
    console.error('GenerateApiKeyError:: ', e)
    throw e;
  }
}

export const deleteApiKeyById = async (id: string) => {
  const user = await userGuard();

  try {
    const apiKeyToDelete = await db.query.apiKeys.findFirst({
      where: and(eq(apiKeys.userId, user.id), eq(apiKeys.id, id))
    })

    if (!apiKeyToDelete) {
      throw new Error('Cannot delete. Api key not found.')
    }

    const [deletedResult] = await db.delete(apiKeys).where(
      and(eq(apiKeys.userId, user.id), eq(apiKeys.id, id))
    ).returning({ deletedId: apiKeys.id })

    const { deletedId } = deletedResult;

    revalidateTag('apiKey')
    return deletedId;
  } catch (err) {
    console.error('DeleteApiKeyById:: ', err)
    throw err;
  }
}