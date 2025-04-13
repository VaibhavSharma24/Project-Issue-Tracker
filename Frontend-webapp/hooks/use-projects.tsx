"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Issue {
  id: string
  title: string
  description: string
  status: "To Do" | "In Progress" | "Done"
  priority: "Low" | "Medium" | "High"
  createdAt: string
}

interface Project {
  id: string
  name: string
  createdAt: string
  issues: Issue[]
}

interface ProjectContextType {
  projects: Project[]
  addProject: (name: string) => void
  getProjectById: (id: string) => Project | undefined
  addIssue: (projectId: string, issue: Omit<Issue, "id" | "createdAt">) => void
  updateIssue: (projectId: string, issueId: string, issueData: Omit<Issue, "id" | "createdAt">) => void
  deleteIssue: (projectId: string, issueId: string) => void
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined)

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useState<Project[]>(() => {
    // Initialize with sample data for demo purposes
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("projects")
      if (saved) {
        return JSON.parse(saved)
      }
    }

    return [
      {
        id: "1",
        name: "Website Redesign",
        createdAt: new Date().toISOString(),
        issues: [
          {
            id: "101",
            title: "Update homepage hero section",
            description: "Replace the current hero with the new design from Figma",
            status: "In Progress",
            priority: "High",
            createdAt: new Date().toISOString(),
          },
          {
            id: "102",
            title: "Optimize images",
            description: "Compress all images to improve page load speed",
            status: "To Do",
            priority: "Medium",
            createdAt: new Date().toISOString(),
          },
          {
            id: "103",
            title: "Fix mobile navigation",
            description: "The hamburger menu doesn't work correctly on iOS devices",
            status: "Done",
            priority: "High",
            createdAt: new Date().toISOString(),
          },
        ],
      },
      {
        id: "2",
        name: "Mobile App Development",
        createdAt: new Date().toISOString(),
        issues: [
          {
            id: "201",
            title: "Implement user authentication",
            description: "Add login and registration screens",
            status: "To Do",
            priority: "High",
            createdAt: new Date().toISOString(),
          },
          {
            id: "202",
            title: "Create onboarding flow",
            description: "Design and implement the onboarding screens for new users",
            status: "To Do",
            priority: "Medium",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ]
  })

  // Save to localStorage whenever projects change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("projects", JSON.stringify(projects))
    }
  }, [projects])

  const addProject = (name: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      createdAt: new Date().toISOString(),
      issues: [],
    }
    setProjects([...projects, newProject])
  }

  const getProjectById = (id: string) => {
    return projects.find((project) => project.id === id)
  }

  const addIssue = (projectId: string, issueData: Omit<Issue, "id" | "createdAt">) => {
    const newIssue: Issue = {
      id: Date.now().toString(),
      ...issueData,
      createdAt: new Date().toISOString(),
    }

    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            issues: [...project.issues, newIssue],
          }
        }
        return project
      }),
    )
  }

  const updateIssue = (projectId: string, issueId: string, issueData: Omit<Issue, "id" | "createdAt">) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            issues: project.issues.map((issue) => {
              if (issue.id === issueId) {
                return {
                  ...issue,
                  ...issueData,
                }
              }
              return issue
            }),
          }
        }
        return project
      }),
    )
  }

  const deleteIssue = (projectId: string, issueId: string) => {
    setProjects(
      projects.map((project) => {
        if (project.id === projectId) {
          return {
            ...project,
            issues: project.issues.filter((issue) => issue.id !== issueId),
          }
        }
        return project
      }),
    )
  }

  return (
    <ProjectContext.Provider value={{ projects, addProject, getProjectById, addIssue, updateIssue, deleteIssue }}>
      {children}
    </ProjectContext.Provider>
  )
}

export function useProjects() {
  const context = useContext(ProjectContext)
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider")
  }
  return context
}
