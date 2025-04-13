"use client"

import type React from "react"

import { useState } from "react"
import { useProjects } from "@/hooks/use-projects"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function CreateProjectForm() {
  const [projectName, setProjectName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { addProject } = useProjects()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!projectName.trim()) return

    setIsSubmitting(true)

    // Simulate network request
    setTimeout(() => {
      addProject(projectName)
      setProjectName("")
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              placeholder="Project name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="border-purple-200 focus-visible:ring-purple-500"
            />
          </div>
          <Button
            type="submit"
            disabled={!projectName.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
