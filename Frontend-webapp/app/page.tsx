import { ProjectList } from "@/components/project-list"
import { CreateProjectForm } from "@/components/create-project-form"

export default function ProjectListPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        Project Management
      </h1>

      <div className="grid gap-8 md:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Your Projects</h2>
          </div>
          <ProjectList />
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Create New Project</h2>
            <CreateProjectForm />
          </div>
        </div>
      </div>
    </div>
  )
}
