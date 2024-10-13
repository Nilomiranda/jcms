'use server'

import {userGuard} from "@/app/shared/guards/userSessionGuard";
import {db} from "@/config/database/setup";
import {publications, PublicationStatus} from "@/server/publications/publicationSchema";
import {redirect} from "next/navigation";

interface SavePublicationAsDraftInput {
  id?: string;
  content: string;
}

export const savePublicationAsDraft = async ({ content, id }: SavePublicationAsDraftInput) => {
  console.log('saving draft', { content, id })
  const user = await userGuard();

  try {
    const createdDraft = await db.insert(publications).values({
      id,
      status: PublicationStatus.DRAFT,
      content,
      userId: user.id,
    }).onConflictDoUpdate({
      target: publications.id,
      set: { content, status: PublicationStatus.DRAFT }
    }).returning()

    if (createdDraft) {
      redirect(`/publish/draft/${createdDraft[0].id}`)
    }

    throw new Error('Draft not saved.')
  } catch (err) {
    console.error('SavePublicationAsDraft::Error:: ', err);
    throw err;
  }
}