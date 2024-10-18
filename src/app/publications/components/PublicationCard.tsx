import { Publication } from "@/server/publications/publicationSchema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Archive, Edit2, MoreVertical, Send, Trash2 } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { deletePublicationById } from "@/app/publish/actions";
import { useToast } from "@/hooks/use-toast";

interface PublicationCardProps {
  publication: Publication;
}

export const PublicationCard = ({ publication }: PublicationCardProps) => {
  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      await deletePublicationById(publication.id);
      toast({
        title: "Publication deleted!",
      });
    } catch (err) {
      toast({
        title: "Publication error",
        description: "Could not save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card key={publication.id}>
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span className="mr-2">{publication.title}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/publish/${publication.id}`}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDeleteClick}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => null}>
                <Archive className="mr-2 h-4 w-4" />
                <span>Archive</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => null}>
                <Send className="mr-2 h-4 w-4" />
                <span>Publish</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-2">
          {publication.description}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Created on{" "}
            {format(new Date(publication.createdAt!), "MMMM d, yyyy")}
          </p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onClick={() => null}
            >
              <Send className="h-4 w-4 mr-1" />
              Publish
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex items-center"
              onClick={() => null}
            >
              <Archive className="h-4 w-4 mr-1" />
              Archive
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
