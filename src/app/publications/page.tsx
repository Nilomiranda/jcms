import { Publications } from "./components/Publications";
import { userGuard } from "@/app/shared/guards/userSessionGuard";
import { db } from "@/config/database/setup";
import { and, eq } from "drizzle-orm";
import { publications } from "@/server/publications/publicationSchema";
import { EmptyPublications } from "@/app/publications/EmptyPublications";

export default async function PublicationsPage() {
  const user = await userGuard();

  const userPublications = await db.query.publications.findMany({
    where: and(eq(publications.userId, user.id)),
  });

  if (!userPublications?.length) {
    return <EmptyPublications />;
  }

  return <Publications publications={userPublications} />;
}
