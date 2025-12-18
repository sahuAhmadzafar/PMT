"use client"

import { useState } from "react"
import { ChevronRight, ChevronDown, Calendar, Filter } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Task {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignee: string
  subtasks?: Task[]
  expanded?: boolean
}

const projects: Task[] = [
  {
    id: "1",
    name: "Website Redesign",
    startDate: new Date(2025, 11, 1),
    endDate: new Date(2025, 11, 25),
    progress: 75,
    assignee: "JD",
    expanded: true,
    subtasks: [
      {
        id: "1-1",
        name: "Design Phase",
        startDate: new Date(2025, 11, 1),
        endDate: new Date(2025, 11, 10),
        progress: 100,
        assignee: "SM",
      },
      {
        id: "1-2",
        name: "Development",
        startDate: new Date(2025, 11, 11),
        endDate: new Date(2025, 11, 20),
        progress: 70,
        assignee: "AK",
      },
      {
        id: "1-3",
        name: "Testing",
        startDate: new Date(2025, 11, 21),
        endDate: new Date(2025, 11, 25),
        progress: 30,
        assignee: "MB",
      },
    ],
  },
  {
    id: "2",
    name: "Mobile App Development",
    startDate: new Date(2025, 11, 5),
    endDate: new Date(2026, 0, 15),
    progress: 45,
    assignee: "LT",
    expanded: false,
    subtasks: [
      {
        id: "2-1",
        name: "UI/UX Design",
        startDate: new Date(2025, 11, 5),
        endDate: new Date(2025, 11, 12),
        progress: 100,
        assignee: "RW",
      },
      {
        id: "2-2",
        name: "Frontend Development",
        startDate: new Date(2025, 11, 13),
        endDate: new Date(2026, 0, 5),
        progress: 40,
        assignee: "LT",
      },
    ],
  },
  {
    id: "3",
    name: "Database Migration",
    startDate: new Date(2025, 11, 10),
    endDate: new Date(2025, 11, 18),
    progress: 90,
    assignee: "AK",
    expanded: false,
  },
]

const monthStart = new Date(2025, 11, 1)
const daysInView = 31

function getDayPosition(date: Date) {
  const diff = Math.floor((date.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24))
  return Math.max(0, Math.min(diff, daysInView - 1))
}

function getBarWidth(startDate: Date, endDate: Date) {
  const start = getDayPosition(startDate)
  const end = getDayPosition(endDate)
  return Math.max(1, end - start + 1)
}

export default function GanttPage() {
  const [tasks, setTasks] = useState<Task[]>(projects)

  const toggleExpand = (taskId: string) => {
    setTasks((prev) => prev.map((task) => (task.id === taskId ? { ...task, expanded: !task.expanded } : task)))
  }

  const renderTask = (task: Task, level = 0) => {
    const startPos = getDayPosition(task.startDate)
    const width = getBarWidth(task.startDate, task.endDate)

    return (
      <div key={task.id}>
        <div className="flex border-b border-border">
          <div className="sticky left-0 z-10 flex w-80 items-center gap-2 border-r border-border bg-background p-3">
            <div style={{ paddingLeft: `${level * 20}px` }}>
              {task.subtasks && task.subtasks.length > 0 && (
                <button onClick={() => toggleExpand(task.id)} className="rounded p-0.5 hover:bg-muted">
                  {task.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium">{task.name}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>
                  {task.startDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
                  {task.endDate.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-bold text-white">
                  {task.assignee}
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex-1 p-3">
            <div
              className="absolute h-8 rounded-lg bg-gradient-to-r from-primary to-secondary"
              style={{
                left: `${(startPos / daysInView) * 100}%`,
                width: `${(width / daysInView) * 100}%`,
              }}
            >
              <div className="h-full overflow-hidden rounded-lg bg-primary/20" style={{ width: `${task.progress}%` }} />
              <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-white">
                {task.progress}%
              </div>
            </div>
          </div>
        </div>

        {task.expanded &&
          task.subtasks &&
          task.subtasks.map((subtask) => <div key={subtask.id}>{renderTask(subtask, level + 1)}</div>)}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gantt Chart</h1>
          <p className="text-muted-foreground">Timeline view of all projects and tasks</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Calendar className="h-4 w-4" />
            December 2025
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[1200px]">
            <div className="flex border-b border-border bg-muted/50">
              <div className="sticky left-0 z-10 w-80 border-r border-border bg-muted/50 p-3">
                <div className="font-semibold">Task Name</div>
              </div>
              <div className="flex flex-1">
                {Array.from({ length: daysInView }, (_, i) => {
                  const date = new Date(monthStart)
                  date.setDate(date.getDate() + i)
                  return (
                    <div
                      key={i}
                      className="flex-1 border-r border-border p-2 text-center text-xs"
                      style={{ minWidth: `${100 / daysInView}%` }}
                    >
                      <div className="font-medium">{date.getDate()}</div>
                      <div className="text-muted-foreground">
                        {date.toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <div>{tasks.map((task) => renderTask(task))}</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
