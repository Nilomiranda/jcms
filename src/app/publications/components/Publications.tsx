import { PublicationsList } from "@/app/publications/components/PublicationsList";
import { Publication } from "@/server/publications/publicationSchema";

interface PublicationsProps {
  publications: Publication[];
}

export const Publications = ({ publications }: PublicationsProps) => {
  return (
    <div className="flex w-full max-w-2xl mx-auto flex-col items-center px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Your content</h1>
      <PublicationsList publications={publications} />
    </div>
  );
};
