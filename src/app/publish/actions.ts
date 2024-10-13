'use server'

import {userGuard} from "@/app/shared/guards/userSessionGuard";
import {db} from "@/config/database/setup";
import {publications, PublicationStatus} from "@/server/publications/publicationSchema";
import {redirect} from "next/navigation";
import {and, eq} from "drizzle-orm";

interface SavePublicationAsDraftInput {
  id?: string;
  content: string;
}

export const savePublicationAsDraft = async ({ content, id }: SavePublicationAsDraftInput) => {
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

export const deletePublicationById = async (id: string) => {
  const user = await userGuard();

  try {
    const [deleteResult] = await db.delete(publications).where(
      and(eq(publications.id, id), eq(publications.userId, user.id))
    ).returning({ deletedId: publications.id })

    const { deletedId } = deleteResult;

    if (deletedId) {
      redirect('/publications');
    }

    throw new Error('Could not delete publication.')
  } catch (err) {
    console.error('DeletePublicationById::Error:: ', err);
    throw err;
  }
}