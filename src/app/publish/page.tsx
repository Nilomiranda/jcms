import { PublishForm } from "@/app/publish/components/PublishForm";
import { serverSessionGuard } from "@/app/shared/guards/serverSessionGuard";

export default async function PublishPage() {
  await serverSessionGuard({ shouldRedirect: true });

  return <PublishForm />;
}
