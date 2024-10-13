'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { AlertCircle, Copy, Key } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Simulated API key type
type ApiKey = {
  id: string
  name: string
  createdAt: Date
  lastUsed: Date | null
}

export const ApiKeySettings = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState('')

  const generateApiKey = () => {
    if (!newKeyName) return

    const newKey = {
      id: Math.random().toString(36).substr(2, 9),
      name: newKeyName,
      createdAt: new Date(),
      lastUsed: null
    }

    setApiKeys([...apiKeys, newKey])
    setNewKeyName('')
    setNewlyGeneratedKey(`${newKey.id}_${Math.random().toString(36).substr(2, 16)}`)
    setShowNewKeyModal(true)
  }

  const deleteApiKey = (id: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">API Key Management</h1>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Generate New API Key</h2>
        <div className="flex space-x-2">
          <Input
            placeholder="Enter key name"
            value={newKeyName}
            onChange={(e) => setNewKeyName(e.target.value)}
          />
          <Button disabled={!newKeyName} onClick={generateApiKey}>Generate Key</Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Active API Keys</h2>
        {apiKeys.length === 0 ? (
          <p>No active API keys</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Last Used</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>{key.name}</TableCell>
                  <TableCell>{key.createdAt.toLocaleString()}</TableCell>
                  <TableCell>{key.lastUsed ? key.lastUsed.toLocaleString() : 'Never'}</TableCell>
                  <TableCell>
                    <Button variant="destructive" onClick={() => deleteApiKey(key.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={showNewKeyModal} onOpenChange={setShowNewKeyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New API Key Generated</DialogTitle>
            <DialogDescription>
              Please copy your new API key. For security reasons, it will only be shown once.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Make sure to copy your API key now. You won't be able to see it again!
              </AlertDescription>
            </Alert>
            <div className="flex items-center space-x-2">
              <Input value={newlyGeneratedKey} readOnly />
              <Button size="icon" onClick={() => copyToClipboard(newlyGeneratedKey)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setShowNewKeyModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}