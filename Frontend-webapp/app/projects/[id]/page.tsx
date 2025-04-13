"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { IssueTable } from "@/components/issue-table"
import { CreateIssueForm } from "@/components/create-issue-form"
import { useProjects } from "@/hooks/use-projects"

export default function IssueListPage() {
  const params = useParams()
  const projectId = params.id as string
  const { getProjectById } = useProjects()
  const project = getProjectById(projectId)
  const [isCreateFormOpen, setIsCreateFormOpen] = useState(false)

  if (!project) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Project not found</h2>
          <Link href="/" className="text-blue-500 hover:underline mt-4 inline-block">
            Return to projects
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        <h1 className="text-4xl font-bold mt-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {project.name}
        </h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <IssueTable projectId={projectId} />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">{isCreateFormOpen ? "Create New Issue" : ""}</h2>
            {isCreateFormOpen ? (
              <CreateIssueForm
                projectId={projectId}
                onCancel={() => setIsCreateFormOpen(false)}
                onSuccess={() => setIsCreateFormOpen(false)}
              />
            ) : (
              <button
                onClick={() => setIsCreateFormOpen(true)}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Create New Issue
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
