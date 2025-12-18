"use client"

import { useState } from "react"
import { Plus, Search, MoreVertical, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Project {
  id: string
  name: string
  description: string
  progress: number
  status: "on-track" | "at-risk" | "completed"
  team: string[]
  dueDate: string
  tasks: { completed: number; total: number }
  budget: { spent: number; total: number }
}

const projects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website with modern design and improved UX",
    progress: 75,
    status: "on-track",
    team: ["JD", "SM", "AK", "MB"],
    dueDate: "Dec 25, 2025",
    tasks: { completed: 18, total: 24 },
    budget: { spent: 45000, total: 60000 },
  },
  {
    id: "2",
    name: "Mobile App Development",
    description: "Native iOS and Android app for customer engagement",
    progress: 45,
    status: "on-track",
    team: ["MB", "LT", "RW"],
    dueDate: "Jan 15, 2026",
    tasks: { completed: 12, total: 28 },
    budget: { spent: 78000, total: 120000 },
  },
  {
    id: "3",
    name: "Marketing Campaign",
    description: "Q1 2026 digital marketing campaign across all channels",
    progress: 30,
    status: "at-risk",
    team: ["JD", "SM"],
    dueDate: "Dec 20, 2025",
    tasks: { completed: 8, total: 20 },
    budget: { spent: 22000, total: 50000 },
  },
  {
    id: "4",
    name: "Database Migration",
    description: "Migrate from legacy database to modern cloud solution",
    progress: 90,
    status: "on-track",
    team: ["AK", "MB", "LT"],
    dueDate: "Dec 18, 2025",
    tasks: { completed: 22, total: 25 },
    budget: { spent: 18000, total: 20000 },
  },
  {
    id: "5",
    name: "API Platform",
    description: "Build comprehensive API platform for third-party integrations",
    progress: 100,
    status: "completed",
    team: ["AK", "RW"],
    dueDate: "Dec 10, 2025",
    tasks: { completed: 15, total: 15 },
    budget: { spent: 35000, total: 35000 },
  },
]

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">Manage and track all your projects</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          New Project
        </button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        >
          <option value="all">All Status</option>
          <option value="on-track">On Track</option>
          <option value="at-risk">At Risk</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                </div>
                <button className="rounded-lg p-1 hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-3">
                <div>
                  <div className="text-xs text-muted-foreground">Tasks</div>
                  <div className="mt-1 text-sm font-semibold">
                    {project.tasks.completed}/{project.tasks.total}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Budget</div>
                  <div className="mt-1 text-sm font-semibold">${(project.budget.spent / 1000).toFixed(0)}k</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Status</div>
                  <div className="mt-1">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        project.status === "completed"
                          ? "bg-success/10 text-success"
                          : project.status === "on-track"
                            ? "bg-primary/10 text-primary"
                            : "bg-warning/10 text-warning"
                      }`}
                    >
                      {project.status === "on-track" ? "On Track" : project.status === "at-risk" ? "At Risk" : "Done"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Due {project.dueDate}</span>
                </div>
                <div className="flex -space-x-2">
                  {project.team.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white"
                    >
                      {member}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
