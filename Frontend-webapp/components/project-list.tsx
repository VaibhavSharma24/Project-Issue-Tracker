"use client"

import Link from "next/link"
import { useProjects } from "@/hooks/use-projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ArrowUpRight } from "lucide-react"

export function ProjectList() {
  const { projects } = useProjects()

  if (projects.length === 0) {
    return (
      <div className="text-center p-12 border border-dashed rounded-lg">
        <p className="text-muted-foreground">No projects yet. Create your first project to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {projects.map((project) => (
        <Link key={project.id} href={`/projects/${project.id}`}>
          <Card className="h-full overflow-hidden group hover:shadow-md transition-all duration-300 hover:border-purple-300">
            <CardHeader className="pb-2">
              <CardTitle className="group-hover:text-purple-600 transition-colors flex items-center justify-between">
                {project.name}
                <ArrowUpRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <CardDescription className="flex items-center text-xs">
                <CalendarDays className="h-3 w-3 mr-1" />
                Created {new Date(project.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Badge variant="outline" className="bg-blue-50">
                  {project.issues.filter((i) => i.status === "To Do").length} To Do
                </Badge>
                <Badge variant="outline" className="bg-amber-50">
                  {project.issues.filter((i) => i.status === "In Progress").length} In Progress
                </Badge>
                <Badge variant="outline" className="bg-green-50">
                  {project.issues.filter((i) => i.status === "Done").length} Done
                </Badge>
              </div>
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">
              {project.issues.length} {project.issues.length === 1 ? "issue" : "issues"} total
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
