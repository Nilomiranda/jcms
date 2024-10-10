'use client'

import { useState } from 'react'
import { Bold, Italic, List, AlignLeft, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {Preview} from "@/app/publish/components/Preview/Preview";
import {mdContentExample} from "@/app/publish/components/Preview/contentMockup";

export default function PublishPage() {
  const [content, setContent] = useState('')

  const handlePublish = () => {
    // Here you would typically send the content to your headless CMS
    console.log('Publishing:', content)
    // Reset the editor after publishing
    setContent('')
  }

  return (
    <div className="flex items-stretch p-4 w-full">
      <div className="w-1/2 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="mb-4 flex justify-between items-center py-2 px-6 bg-gray-100">
          <div className="space-x-2">
            <Button variant="ghost" size="icon">
              <Bold className="h-4 w-4"/>
              <span className="sr-only">Bold</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Italic className="h-4 w-4"/>
              <span className="sr-only">Italic</span>
            </Button>
            <Button variant="ghost" size="icon">
              <List className="h-4 w-4"/>
              <span className="sr-only">List</span>
            </Button>
            <Button variant="ghost" size="icon">
              <AlignLeft className="h-4 w-4"/>
              <span className="sr-only">Align Left</span>
            </Button>
          </div>
          <div className="flex items-center gap-x-2">
            <Button variant="secondary" onClick={() => setContent(mdContentExample)}>Use example content</Button>
            <Button onClick={handlePublish} className="text-white">
              <Send className="h-4 w-4 mr-2"/>
              Publish
            </Button>
          </div>
        </div>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your content here..."
          className="w-full h-screen p-4 text-lg border-none focus:outline-0 resize-none"
        />
      </div>

      <div className="w-1/2 flex  flex-col items-stretch bg-white shadow-lg rounded-lg">
        <div className="py-2 px-6 bg-gray-100">
          <strong>Preview</strong> <span className="text-gray-500">(May not reflect how your content will be rendered)</span>
        </div>
        <Preview content={content} />
      </div>
    </div>
  )
}