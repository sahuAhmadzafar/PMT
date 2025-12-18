"use client"

import { useState, useEffect } from "react"
import { Play, Pause, Square, Calendar, Download, Filter } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface TimeEntry {
  id: string
  project: string
  task: string
  startTime: Date
  endTime?: Date
  duration: number
  description: string
}

const recentEntries: TimeEntry[] = [
  {
    id: "1",
    project: "Website Redesign",
    task: "Design Homepage",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 1),
    duration: 7200,
    description: "Created wireframes and mockups",
  },
  {
    id: "2",
    project: "Mobile App",
    task: "API Integration",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 5),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 3),
    duration: 7200,
    description: "Implemented authentication endpoints",
  },
  {
    id: "3",
    project: "Database Migration",
    task: "Schema Updates",
    startTime: new Date(Date.now() - 1000 * 60 * 60 * 8),
    endTime: new Date(Date.now() - 1000 * 60 * 60 * 7),
    duration: 3600,
    description: "Updated user table structure",
  },
]

const projectStats = [
  { name: "Website Redesign", hours: 42, percentage: 35, color: "from-blue-500 to-blue-600" },
  { name: "Mobile App", hours: 38, percentage: 32, color: "from-purple-500 to-purple-600" },
  { name: "Database Migration", hours: 25, percentage: 21, color: "from-cyan-500 to-cyan-600" },
  { name: "Marketing", hours: 15, percentage: 12, color: "from-pink-500 to-pink-600" },
]

function formatDuration(seconds: number) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`
}

export default function TimeTrackingPage() {
  const [isTracking, setIsTracking] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [currentTask, setCurrentTask] = useState("")
  const [currentProject, setCurrentProject] = useState("Website Redesign")

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isTracking && !isPaused) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [isTracking, isPaused])

  const startTracking = () => {
    if (!currentTask) return
    setIsTracking(true)
    setIsPaused(false)
  }

  const pauseTracking = () => {
    setIsPaused(!isPaused)
  }

  const stopTracking = () => {
    setIsTracking(false)
    setIsPaused(false)
    setElapsedTime(0)
    setCurrentTask("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Time Tracking</h1>
        <p className="text-muted-foreground">Track time spent on projects and tasks</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium">Task</label>
                <input
                  type="text"
                  value={currentTask}
                  onChange={(e) => setCurrentTask(e.target.value)}
                  placeholder="What are you working on?"
                  disabled={isTracking}
                  className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Project</label>
                <select
                  value={currentProject}
                  onChange={(e) => setCurrentProject(e.target.value)}
                  disabled={isTracking}
                  className="w-full rounded-lg border border-border bg-muted/50 px-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option>Website Redesign</option>
                  <option>Mobile App</option>
                  <option>Database Migration</option>
                  <option>Marketing</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 p-6">
              <div className="text-4xl font-bold tabular-nums">{formatDuration(elapsedTime)}</div>
              <div className="flex gap-2">
                {!isTracking ? (
                  <button
                    onClick={startTracking}
                    disabled={!currentTask}
                    className="flex items-center gap-2 rounded-lg bg-success px-6 py-3 font-medium text-white hover:bg-success/90 disabled:opacity-50"
                  >
                    <Play className="h-5 w-5" />
                    Start
                  </button>
                ) : (
                  <>
                    <button
                      onClick={pauseTracking}
                      className="flex items-center gap-2 rounded-lg bg-warning px-6 py-3 font-medium text-white hover:bg-warning/90"
                    >
                      <Pause className="h-5 w-5" />
                      {isPaused ? "Resume" : "Pause"}
                    </button>
                    <button
                      onClick={stopTracking}
                      className="flex items-center gap-2 rounded-lg bg-danger px-6 py-3 font-medium text-white hover:bg-danger/90"
                    >
                      <Square className="h-5 w-5" />
                      Stop
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Time Entries</CardTitle>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                <Calendar className="h-4 w-4" />
                This Week
              </button>
              <button className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">
                <Filter className="h-4 w-4" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div className="flex-1">
                    <div className="font-medium">{entry.task}</div>
                    <div className="text-sm text-muted-foreground">{entry.project}</div>
                    {entry.description && <div className="mt-1 text-sm text-muted-foreground">{entry.description}</div>}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold">{formatDuration(entry.duration)}</div>
                    <div className="text-xs text-muted-foreground">
                      {entry.startTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Project Summary</CardTitle>
            <button className="rounded-lg p-1.5 hover:bg-muted">
              <Download className="h-4 w-4" />
            </button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="text-3xl font-bold">120</div>
              <div className="text-sm text-muted-foreground">Total hours this week</div>
            </div>

            <div className="space-y-4">
              {projectStats.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-muted-foreground">{project.hours}h</span>
                  </div>
                  <Progress value={project.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
