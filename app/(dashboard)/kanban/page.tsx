"use client"

import type React from "react"

import { useState } from "react"
import { Plus, MoreVertical, Calendar, MessageSquare, Paperclip } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignees: string[]
  dueDate: string
  comments: number
  attachments: number
  tags: string[]
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design new landing page",
        description: "Create wireframes and mockups for the new homepage",
        priority: "high",
        assignees: ["JD", "SM"],
        dueDate: "Dec 20",
        comments: 3,
        attachments: 2,
        tags: ["Design", "UI/UX"],
      },
      {
        id: "2",
        title: "Setup database schema",
        description: "Define tables and relationships for the new feature",
        priority: "medium",
        assignees: ["AK"],
        dueDate: "Dec 22",
        comments: 1,
        attachments: 0,
        tags: ["Backend"],
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "3",
        title: "Implement authentication",
        description: "Add OAuth and email/password authentication",
        priority: "high",
        assignees: ["MB", "LT"],
        dueDate: "Dec 18",
        comments: 5,
        attachments: 1,
        tags: ["Backend", "Security"],
      },
      {
        id: "4",
        title: "Create API endpoints",
        description: "Build REST API for user management",
        priority: "medium",
        assignees: ["RW"],
        dueDate: "Dec 21",
        comments: 2,
        attachments: 0,
        tags: ["Backend", "API"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "5",
        title: "Update documentation",
        description: "Add API documentation and usage examples",
        priority: "low",
        assignees: ["SM"],
        dueDate: "Dec 19",
        comments: 4,
        attachments: 3,
        tags: ["Documentation"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      {
        id: "6",
        title: "Setup CI/CD pipeline",
        description: "Configure automated testing and deployment",
        priority: "high",
        assignees: ["AK", "MB"],
        dueDate: "Dec 15",
        comments: 8,
        attachments: 2,
        tags: ["DevOps"],
      },
    ],
  },
]

const priorityColors = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning/10 text-warning",
  high: "bg-danger/10 text-danger",
}

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns)
  const [draggedTask, setDraggedTask] = useState<{ task: Task; columnId: string } | null>(null)

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask({ task, columnId })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return

    const { task, columnId: sourceColumnId } = draggedTask

    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null)
      return
    }

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColumnId) {
          return { ...col, tasks: col.tasks.filter((t) => t.id !== task.id) }
        }
        if (col.id === targetColumnId) {
          return { ...col, tasks: [...col.tasks, task] }
        }
        return col
      }),
    )

    setDraggedTask(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-muted-foreground">Manage tasks with drag-and-drop workflow</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {columns.map((column) => (
          <div key={column.id} className="flex flex-col">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold">{column.title}</h2>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-muted text-xs font-medium">
                  {column.tasks.length}
                </span>
              </div>
              <button className="rounded-lg p-1 hover:bg-muted">
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(column.id)}
              className="flex-1 space-y-3 rounded-lg bg-muted/30 p-3 min-h-[500px]"
            >
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  draggable
                  onDragStart={() => handleDragStart(task, column.id)}
                  className="cursor-move transition-all hover:shadow-lg"
                >
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-medium leading-tight">{task.title}</h3>
                      <button className="rounded-lg p-1 hover:bg-muted">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-2">{task.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar className="h-3 w-3" />
                          {task.dueDate}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <MessageSquare className="h-3 w-3" />
                          {task.comments}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Paperclip className="h-3 w-3" />
                          {task.attachments}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${priorityColors[task.priority]}`}
                        >
                          {task.priority}
                        </span>
                        <div className="flex -space-x-1">
                          {task.assignees.map((assignee, idx) => (
                            <div
                              key={idx}
                              className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white"
                            >
                              {assignee}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
