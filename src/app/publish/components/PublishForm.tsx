'use client'

import {useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {AlignLeft, Bold, Italic, List, Send} from "lucide-react";
import {mdContentExample} from "@/app/publish/components/Preview/contentMockup";
import {Textarea} from "@/components/ui/textarea";
import {Preview} from "@/app/publish/components/Preview/Preview";

export const PublishForm = () => {
  const [content, setContent] = useState('')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextArea = () => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
    }
  }

  const handleChange = (event) => {
    setContent(event.target.value)
    resizeTextArea();
  }

  const handlePublish = () => {
    // Here you would typically send the content to your headless CMS
    console.log('Publishing:', content)
    // Reset the editor after publishing
    setContent('')
  }

  return (
    <div className="flex items-stretch h-full p-4 w-full">
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
            <Button variant="secondary" onClick={() => {
              setContent(mdContentExample)
              resizeTextArea();
            }}>Use example content</Button>
            <Button onClick={handlePublish} className="text-white">
              <Send className="h-4 w-4 mr-2"/>
              Publish
            </Button>
          </div>
        </div>
        <Textarea
          ref={textAreaRef}
          value={content}
          onChange={handleChange}
          placeholder="Start writing your content here..."
          className="w-full p-4 text-lg border-none focus:outline-0 h-auto"
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