'use client'
import {ApiKeySettings} from "@/app/settings/components/ApiKeySettings";

export const Settings = () => {
  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col">
      <ApiKeySettings />
    </div>
  )
}