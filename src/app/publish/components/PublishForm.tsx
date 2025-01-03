"use client";

import { ChangeEventHandler, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlignLeft, Bold, Italic, List, Save, Send, Trash } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Preview } from "@/app/publish/components/Preview/Preview";
import { useToast } from "@/hooks/use-toast";
import {
  deletePublicationById,
  editArticle,
  publishArticle,
  savePublicationAsDraft,
} from "@/app/publish/actions";
import { Publication } from "@/server/publications/publicationSchema";
import { Input } from "@/components/ui/input";

interface PublishFormProps {
  draftId?: string;
  draft?: Publication;

  id?: string;
  publication?: Publication;
}

export const PublishForm = ({
  draftId,
  draft,
  publication,
  id,
}: PublishFormProps) => {
  const existingContent = publication?.content || draft?.content || "";
  const existingTitle = publication?.title || draft?.title || "";
  const existingDescription =
    publication?.description || draft?.description || "";

  const isEditingPublishedContent = Boolean(id);

  const { toast } = useToast();
  const [title, setTitle] = useState(existingTitle);
  const [description, setDescription] = useState(existingDescription);
  const [content, setContent] = useState(existingContent);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextArea = () => {
    if (textAreaRef?.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setContent(event.target.value);
    resizeTextArea();
  };

  const handleEdit = async () => {
    try {
      await editArticle({
        id,
        content,
        title,
        description,
      });
    } catch {
      toast({
        title: "Publication error",
        description: "Could not save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePublish = async () => {
    try {
      await publishArticle({
        content,
        title,
        description,
      });
    } catch {
      toast({
        title: "Publication error",
        description: "Could not publish. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveDraftClick = async () => {
    try {
      await savePublicationAsDraft({
        content,
        title,
        description,
        id: draftId,
      });
    } catch {
      toast({
        title: "Draft error",
        /**
         * TODO: implement a local backup of the draft in case of an error.
         */
        description:
          "Could not save draft. Keep a safe copy of your draft, refresh page and try again",
        variant: "destructive",
      });
    }
  };

  const handleDeleteClick = async () => {
    const idToDelete = id || draftId;

    if (!idToDelete) {
      return;
    }

    try {
      await deletePublicationById(idToDelete);
    } catch {
      toast({
        title: "Delete error",
        description: "Could not delete publication. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-stretch h-full p-4 w-full">
      <div className="w-1/2 max-w-2xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="flex flex-col px-4 pb-4 gap-4">
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-2xl text-gray-500 font-bold"
          />
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            className="text-sm text-gray-500"
          />
        </div>

        <div className="mb-4 flex justify-between items-center py-2 px-6 bg-gray-100">
          <div className="space-x-2">
            {/* TODO: implement text formatting buttons */}
            {/*<Button variant="ghost" size="icon">*/}
            {/*  <Bold className="h-4 w-4" />*/}
            {/*  <span className="sr-only">Bold</span>*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="icon">*/}
            {/*  <Italic className="h-4 w-4" />*/}
            {/*  <span className="sr-only">Italic</span>*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="icon">*/}
            {/*  <List className="h-4 w-4" />*/}
            {/*  <span className="sr-only">List</span>*/}
            {/*</Button>*/}
            {/*<Button variant="ghost" size="icon">*/}
            {/*  <AlignLeft className="h-4 w-4" />*/}
            {/*  <span className="sr-only">Align Left</span>*/}
            {/*</Button>*/}
          </div>
          <div className="flex items-center gap-x-2">
            {(id || draftId) && (
              <Button variant="destructive" onClick={handleDeleteClick}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
            {!isEditingPublishedContent && (
              <Button variant="secondary" onClick={handleSaveDraftClick}>
                Save draft
              </Button>
            )}
            <Button
              onClick={isEditingPublishedContent ? handleEdit : handlePublish}
              className="text-white"
            >
              {isEditingPublishedContent ? (
                <Save className="h-4 w-4 mr-2" />
              ) : (
                <Send className="h-4 w-4 mr-2" />
              )}

              {isEditingPublishedContent ? "Save" : "Publish"}
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
          <strong>Preview</strong>{" "}
          <span className="text-gray-500">
            (May not reflect how your content will be rendered)
          </span>
        </div>
        <Preview content={content} />
      </div>
    </div>
  );
};
