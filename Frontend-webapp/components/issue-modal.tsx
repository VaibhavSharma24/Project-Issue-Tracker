"use client"

import { useState } from "react"
import { useProjects } from "@/hooks/use-projects"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, AlertCircle } from "lucide-react"
import { EditIssueForm } from "@/components/edit-issue-form"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Issue } from "@/hooks/use-projects"

interface IssueModalProps {
  isOpen: boolean
  onClose: () => void
  issue: Issue
  projectId: string
}

export function IssueModal({ isOpen, onClose, issue, projectId }: IssueModalProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { deleteIssue } = useProjects()

  const handleDelete = () => {
    deleteIssue(projectId, issue.id)
    setIsDeleteDialogOpen(false)
    onClose()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "text-red-500 bg-red-50"
      case "Medium":
        return "text-amber-500 bg-amber-50"
      case "Low":
        return "text-green-500 bg-green-50"
      default:
        return "text-slate-500 bg-slate-50"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "To Do":
        return "bg-blue-50 text-blue-600 border-blue-200"
      case "In Progress":
        return "bg-amber-50 text-amber-600 border-amber-200"
      case "Done":
        return "bg-green-50 text-green-600 border-green-200"
      default:
        return "bg-slate-50 text-slate-600 border-slate-200"
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          {isEditing ? (
            <EditIssueForm
              issue={issue}
              projectId={projectId}
              onCancel={() => setIsEditing(false)}
              onSuccess={() => {
                setIsEditing(false)
                onClose()
              }}
            />
          ) : (
            <>
              <DialogHeader className="p-6 pb-2">
                <div className="flex justify-between items-start">
                  <DialogTitle className="text-xl font-bold pr-8">{issue.title}</DialogTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsEditing(true)
                      }}
                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsDeleteDialogOpen(true)
                      }}
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </div>
              </DialogHeader>
              <div className="px-6 py-2">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className={getStatusColor(issue.status)}>
                    {issue.status}
                  </Badge>
                  <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                    {issue.priority}
                  </Badge>
                  <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
                    Created: {new Date(issue.createdAt).toLocaleDateString()}
                  </Badge>
                </div>
                <div className="bg-muted/30 rounded-lg p-4 mb-4">
                  {issue.description ? (
                    <p className="text-sm whitespace-pre-wrap">{issue.description}</p>
                  ) : (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      No description provided
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter className="bg-muted/30 p-4">
                <Button variant="outline" onClick={onClose}>
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the issue "{issue.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
