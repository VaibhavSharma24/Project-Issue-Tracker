"use client"

import { useState } from "react"
import { useProjects } from "@/hooks/use-projects"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IssueModal } from "@/components/issue-modal"
import type { Issue } from "@/hooks/use-projects"

type Status = "All" | "To Do" | "In Progress" | "Done"

export function IssueTable({ projectId }: { projectId: string }) {
  const [statusFilter, setStatusFilter] = useState<Status>("All")
  const { getProjectById } = useProjects()
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const project = getProjectById(projectId)

  if (!project) return null

  const filteredIssues = project.issues.filter((issue) =>
    statusFilter === "All" ? true : issue.status === statusFilter,
  )

  const handleIssueClick = (issue: Issue) => {
    setSelectedIssue(issue)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedIssue(null)
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Issues</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filter by status:</span>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as Status)}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="To Do">To Do</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="text-center p-12 border border-dashed rounded-lg">
          <p className="text-muted-foreground">
            {statusFilter === "All"
              ? "No issues yet. Create your first issue to get started."
              : `No issues with status "${statusFilter}".`}
          </p>
        </div>
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredIssues.map((issue) => (
                <TableRow
                  key={issue.id}
                  className="group hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => handleIssueClick(issue)}
                >
                  <TableCell className="font-medium group-hover:text-purple-600 transition-colors">
                    {issue.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusColor(issue.status)}>
                      {issue.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getPriorityColor(issue.priority)}>
                      {issue.priority}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {selectedIssue && (
        <IssueModal isOpen={isModalOpen} onClose={handleCloseModal} issue={selectedIssue} projectId={projectId} />
      )}
    </div>
  )
}
