'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { FileText, LogOut } from "lucide-react"
import {signOut} from "next-auth/react";
import {redirect} from "next/navigation";

export const TopNavBar = () => {

  const handleLogout = async () => {
    // Implement logout logic here
    await signOut()
    redirect('/login')
  }

  return (
    <nav className="top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between space-x-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/publications">
              <FileText className="w-4 h-4 mr-2"/>
              Publications
            </Link>
          </Button>
          <Button variant="secondary" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2"/>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  )
}