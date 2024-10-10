'use client'

import { useState } from 'react'
import { Bold, Italic, List, AlignLeft, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function PublishPage() {
  const [content, setContent] = useState('')

  const handlePublish = () => {
    // Here you would typically send the content to your headless CMS
    console.log('Publishing:', content)
    // Reset the editor after publishing
    setContent('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <div className="mb-4 flex justify-between items-center">
        <div className="space-x-2">
          <Button variant="ghost" size="icon">
            <Bold className="h-4 w-4" />
            <span className="sr-only">Bold</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Italic className="h-4 w-4" />
            <span className="sr-only">Italic</span>
          </Button>
          <Button variant="ghost" size="icon">
            <List className="h-4 w-4" />
            <span className="sr-only">List</span>
          </Button>
          <Button variant="ghost" size="icon">
            <AlignLeft className="h-4 w-4" />
            <span className="sr-only">Align Left</span>
          </Button>
        </div>
        <Button onClick={handlePublish} className="text-white">
          <Send className="h-4 w-4 mr-2" />
          Publish
        </Button>
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your content here..."
        className="w-full h-[calc(100vh-200px)] p-4 text-lg border-none focus:outline-0 resize-none"
      />
    </div>
  )
}