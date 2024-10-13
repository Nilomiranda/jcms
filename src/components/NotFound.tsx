import {FrownIcon} from "lucide-react";
import Link from "next/link";
import {ReactNode} from "react";

interface NotFoundProps {
  title?: string;
  description?: string | ReactNode;
}

export const NotFound = ({ title, description }: NotFoundProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <FrownIcon className="w-16 h-16 mb-4 text-muted-foreground" />
      {/*<h1 className="text-4xl font-bold mb-2">404</h1>*/}
      <h2 className="text-2xl font-semibold mb-4">{ title || 'Page Not Found' }</h2>
      {
        (!description || typeof description === 'string') ? <p className="text-lg mb-8 text-center max-w-md">
          {description || 'Oops! The page you\'re looking for doesn\'t exist or has been moved.'}
        </p> : description
      }
      <Link
        href="/publications"
        className="px-6 py-3 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Return to Home
      </Link>
    </div>
  )
}