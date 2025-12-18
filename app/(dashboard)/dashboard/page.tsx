"use client"

import { useState, useEffect } from "react"
import { ArrowUp, ArrowDown, CheckCircle2, Clock, Users, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const stats = [
  { name: "Active Projects", value: "12", change: "+2", trend: "up", icon: TrendingUp },
  { name: "Tasks Completed", value: "156", change: "+12%", trend: "up", icon: CheckCircle2 },
  { name: "Team Members", value: "24", change: "+3", trend: "up", icon: Users },
  { name: "Hours Tracked", value: "1,284", change: "-5%", trend: "down", icon: Clock },
]

const projects = [
  {
    id: 1,
    name: "Website Redesign",
    progress: 75,
    tasks: { completed: 18, total: 24 },
    dueDate: "Dec 25, 2025",
    team: ["JD", "SM", "AK"],
    status: "on-track",
  },
  {
    id: 2,
    name: "Mobile App Development",
    progress: 45,
    tasks: { completed: 12, total: 28 },
    dueDate: "Jan 15, 2026",
    team: ["MB", "LT", "RW"],
    status: "on-track",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    progress: 30,
    tasks: { completed: 8, total: 20 },
    dueDate: "Dec 20, 2025",
    team: ["JD", "SM"],
    status: "at-risk",
  },
  {
    id: 4,
    name: "Database Migration",
    progress: 90,
    tasks: { completed: 22, total: 25 },
    dueDate: "Dec 18, 2025",
    team: ["AK", "MB"],
    status: "on-track",
  },
]

const recentActivity = [
  { id: 1, user: "John Doe", action: "completed task", target: "Design Homepage", time: "5 min ago" },
  { id: 2, user: "Sarah Miller", action: "commented on", target: "API Integration", time: "12 min ago" },
  { id: 3, user: "Alex Kim", action: "updated status", target: "Database Migration", time: "1 hour ago" },
  { id: 4, user: "Mike Brown", action: "assigned task to", target: "Lisa Taylor", time: "2 hours ago" },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your projects.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${
                    stat.trend === "up" ? "text-success" : "text-danger"
                  }`}
                >
                  {stat.trend === "up" ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                  {stat.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.tasks.completed} of {project.tasks.total} tasks completed • Due {project.dueDate}
                      </p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        project.status === "on-track" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                      }`}
                    >
                      {project.status === "on-track" ? "On Track" : "At Risk"}
                    </span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  <div className="flex items-center justify-between">
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
                    <span className="text-sm font-medium text-muted-foreground">{project.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-bold">
                    {activity.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm leading-tight">
                      <span className="font-medium">{activity.user}</span>{" "}
                      <span className="text-muted-foreground">{activity.action}</span>{" "}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
