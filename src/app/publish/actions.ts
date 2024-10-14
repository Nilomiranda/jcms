"use server";

import { userGuard } from "@/app/shared/guards/userSessionGuard";
import { db } from "@/config/database/setup";
import {
  publications,
  PublicationStatus,
} from "@/server/publications/publicationSchema";
import { redirect } from "next/navigation";
import { and, eq } from "drizzle-orm";

interface SavePublicationInput {
  id?: string;
  content: string;
  title: string;
  description?: string;
}

export const editArticle = async ({
  id,
  content,
  title,
  description,
}: SavePublicationInput) => {
  await publishArticle({ id, content, title, description });
};

export const publishArticle = async ({
  id,
  content,
  title,
  description,
}: SavePublicationInput) => {
  const user = await userGuard();

  try {
    const createdPublication = await db
      .insert(publications)
      .values({
        id,
        title,
        description,
        status: PublicationStatus.PUBLISHED,
        content,
        userId: user.id,
      })
      .onConflictDoUpdate({
        target: publications.id,
        set: {
          content,
          title,
          description,
          status: PublicationStatus.PUBLISHED,
        },
      })
      .returning();

    if (createdPublication) {
      redirect(`/publish/${createdPublication[0].id}`);
    }

    throw new Error("Error publishing.");
  } catch (err) {
    console.error("PublishArticle::Error:: ", err);
    throw err;
  }
};

export const savePublicationAsDraft = async ({
  content,
  title,
  description,
  id,
}: SavePublicationInput) => {
  const user = await userGuard();

  try {
    const createdDraft = await db
      .insert(publications)
      .values({
        id,
        title,
        description,
        status: PublicationStatus.DRAFT,
        content,
        userId: user.id,
      })
      .onConflictDoUpdate({
        target: publications.id,
        set: { content, status: PublicationStatus.DRAFT },
      })
      .returning();

    if (createdDraft) {
      redirect(`/publish/draft/${createdDraft[0].id}`);
    }

    throw new Error("Draft not saved.");
  } catch (err) {
    console.error("SavePublicationAsDraft::Error:: ", err);
    throw err;
  }
};

export const deletePublicationById = async (id: string) => {
  const user = await userGuard();

  try {
    const [deleteResult] = await db
      .delete(publications)
      .where(and(eq(publications.id, id), eq(publications.userId, user.id)))
      .returning({ deletedId: publications.id });

    const { deletedId } = deleteResult;

    if (deletedId) {
      redirect("/publications");
    }

    throw new Error("Could not delete publication.");
  } catch (err) {
    console.error("DeletePublicationById::Error:: ", err);
    throw err;
  }
};
