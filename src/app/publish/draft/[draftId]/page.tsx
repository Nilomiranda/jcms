import {PublishForm} from "@/app/publish/components/PublishForm";
import {db} from "@/config/database/setup";
import {and, eq} from "drizzle-orm";
import {publications, PublicationStatus} from "@/server/publications/publicationSchema";
import {userGuard} from "@/app/shared/guards/userSessionGuard";
import {NotFound} from "@/components/NotFound";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default async function PublishDraftPage({ params: { draftId } }: { params: { draftId: string } }) {
  const user = await userGuard();

  const draft = await db.query.publications.findFirst({
    where: and(eq(publications.id, draftId), eq(publications.userId, user.id), eq(publications.status, PublicationStatus.DRAFT))
  })

  if (!draft) {
    return <NotFound
      title="Draft not found"
      description={
        <p
          className="text-lg mb-8 text-center max-w-md"
        >
          Maybe it's time to start <Button className="p-0 text-lg text-center max-w-md" variant="link" asChild><Link href="/publish">writing that fire post again.</Link></Button>
        </p>
      }
    />
  }

  return (
    <PublishForm draftId={draftId} draft={draft} />
  )
}