import {PublishForm} from "@/app/publish/components/PublishForm";
import {db} from "@/config/database/setup";
import {and, eq} from "drizzle-orm";
import {publications, PublicationStatus} from "@/server/publications/publicationSchema";
import {userGuard} from "@/app/shared/guards/userSessionGuard";

export default async function PublishDraftPage({ params: { draftId } }: { params: { draftId: string } }) {
  const user = await userGuard();

  const draft = await db.query.publications.findFirst({
    where: and(eq(publications.id, draftId), eq(publications.userId, user.id), eq(publications.status, PublicationStatus.DRAFT))
  })

  return (
    <PublishForm draftId={draftId} draft={draft} />
  )
}