import {PropsWithChildren} from "react";
import {TopNavBar} from "@/app/shared/components/TopNavBar";

export default function PublishLayout({children}: PropsWithChildren) {
  return (
    <main className="w-full h-full flex flex-col">
      <TopNavBar />
      <div className="flex-1">
        {children}
      </div>
    </main>
  )
}