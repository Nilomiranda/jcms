"use client";

import { Publication } from "@/server/publications/publicationSchema";
import { PublicationCard } from "@/app/publications/components/PublicationCard";

interface PublicationsListProps {
  publications: Publication[];
}

export const PublicationsList = ({ publications }: PublicationsListProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4">
        {publications.map((publication) => (
          <PublicationCard publication={publication} key={publication.id} />
        ))}
      </div>
    </div>
  );
};
