import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const EmptyPublications = () => {
  return (
    <Card className="w-full max-w-2xl mt-10 mx-auto p-6 text-center">
      <CardContent className="flex flex-col items-center">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No Publications Yet</h2>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first publication.
        </p>
        <Button asChild>
          <Link href="/publish">
            <FileText className="mr-2 h-4 w-4" /> Create Publication
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
