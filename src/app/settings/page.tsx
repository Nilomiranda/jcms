import {Settings} from  './components/Settings'
import {serverSessionGuard} from "@/app/shared/guards/serverSessionGuard";

export default async function SettingsPage() {
  await serverSessionGuard({ shouldRedirect: true })

  return (
    <Settings />
  )
}