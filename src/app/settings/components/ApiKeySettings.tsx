"use client";

import { FormEventHandler, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AlertCircle, CheckIcon, Copy } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SubmitButton } from "@/components/form/SubmitButton";
import { deleteApiKeyById, generateApiKey } from "@/app/settings/actions";
import { ApiKey } from "@/server/apiKeys/apiKeySchema";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface ApiKeySettingsProps {
  userApiKey?: ApiKey;
}

export const ApiKeySettings = ({ userApiKey }: ApiKeySettingsProps) => {
  const { toast } = useToast();
  const [newKeyName, setNewKeyName] = useState("");
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState("");
  const [copiedApiKey, setCopiedApiKey] = useState(false);

  useEffect(() => {
    if (!copiedApiKey) {
      return;
    }

    const timeout = setTimeout(() => {
      setCopiedApiKey(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [copiedApiKey]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    console.log({ newKeyName });
    if (!newKeyName) {
      return;
    }

    try {
      const key = await generateApiKey({ name: newKeyName });
      if (!key) {
        console.error("GenerateApiKey::Error::", "No api key generated.");
        return;
      }

      setNewlyGeneratedKey(key);
      setShowNewKeyModal(true);
    } catch {
      toast({
        variant: "destructive",
        title: "Create api key error",
        description:
          "Error when attempting to create api key. Please try again.",
      });
    }
  };

  const deleteApiKey = async (id: string) => {
    try {
      const deletedId = await deleteApiKeyById(id);

      if (deletedId) {
        toast({
          title: "Successfully deleted api key.",
        });

        return;
      }

      toast({
        variant: "destructive",
        title: "Create api key error",
        description:
          "Error when attempting to create api key. Please try again.",
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Create api key error",
        description:
          "Error when attempting to create api key. Please try again.",
      });
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedApiKey(true);
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">API Key Management</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generate New API Key</h2>
        <form className="flex space-x-2" onSubmit={handleSubmit}>
          <Input
            required
            placeholder="Enter key name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
          <SubmitButton disabled={!newKeyName}>Generate Key</SubmitButton>
        </form>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active API Keys</h2>
        {!userApiKey ? (
          <p>No active API keys</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{userApiKey.name}</TableCell>
                <TableCell>
                  {format(new Date(userApiKey.createdAt!), "yyyy-MM-dd")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => deleteApiKey(userApiKey.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={showNewKeyModal} onOpenChange={setShowNewKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please copy your new API key. For security reasons, it will only
              be shown once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Make sure to copy your API key now. You won't be able to see it
                again!
              </AlertDescription>
            </Alert>
            <div className="flex items-center space-x-2">
              <Input value={newlyGeneratedKey} readOnly />
              <Button
                size="icon"
                onClick={() => copyToClipboard(newlyGeneratedKey)}
              >
                {copiedApiKey ? (
                  <CheckIcon className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowNewKeyModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
