'use client'

import {ApiKeySettings} from "@/app/settings/components/ApiKeySettings";
import {ApiKey} from "@/server/apiKeys/apiKeySchema";

interface SettingsProps {
  userApiKey?: ApiKey;
}

export const Settings = ({ userApiKey }: SettingsProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col">
      <ApiKeySettings userApiKey={userApiKey} />
    </div>
  )
}