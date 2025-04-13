"use client"

import type React from "react"

import { useState } from "react"
import { useProjects } from "@/hooks/use-projects"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"

interface CreateIssueFormProps {
  projectId: string
  onCancel: () => void
  onSuccess: () => void
}

export function CreateIssueForm({ projectId, onCancel, onSuccess }: CreateIssueFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("To Do")
  const [priority, setPriority] = useState("Medium")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { addIssue } = useProjects()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return

    setIsSubmitting(true)

    // Simulate network request
    setTimeout(() => {
      addIssue(projectId, {
        title,
        description,
        status: status as "To Do" | "In Progress" | "Done",
        priority: priority as "Low" | "Medium" | "High",
      })
      setIsSubmitting(false)
      onSuccess()
    }, 500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Issue title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <div className="space-y-2">
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] border-purple-200 focus-visible:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="To Do">To Do</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
            >
              {isSubmitting ? "Creating..." : "Create Issue"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
