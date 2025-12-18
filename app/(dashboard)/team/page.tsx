"use client"

import { Search, Mail, MoreVertical, UserPlus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  status: "online" | "away" | "offline"
  projects: number
  tasks: { completed: number; active: number }
}

const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Project Manager",
    avatar: "JD",
    status: "online",
    projects: 4,
    tasks: { completed: 28, active: 5 },
  },
  {
    id: "2",
    name: "Sarah Miller",
    email: "sarah.miller@company.com",
    role: "UI/UX Designer",
    avatar: "SM",
    status: "online",
    projects: 3,
    tasks: { completed: 45, active: 8 },
  },
  {
    id: "3",
    name: "Alex Kim",
    email: "alex.kim@company.com",
    role: "Full Stack Developer",
    avatar: "AK",
    status: "away",
    projects: 5,
    tasks: { completed: 67, active: 12 },
  },
  {
    id: "4",
    name: "Mike Brown",
    email: "mike.brown@company.com",
    role: "Backend Developer",
    avatar: "MB",
    status: "online",
    projects: 4,
    tasks: { completed: 52, active: 9 },
  },
  {
    id: "5",
    name: "Lisa Taylor",
    email: "lisa.taylor@company.com",
    role: "Frontend Developer",
    avatar: "LT",
    status: "offline",
    projects: 2,
    tasks: { completed: 38, active: 6 },
  },
  {
    id: "6",
    name: "Robert Wilson",
    email: "robert.wilson@company.com",
    role: "DevOps Engineer",
    avatar: "RW",
    status: "online",
    projects: 3,
    tasks: { completed: 31, active: 4 },
  },
]

const statusColors = {
  online: "bg-success",
  away: "bg-warning",
  offline: "bg-muted-foreground",
}

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">Manage your team members and their roles</p>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          <UserPlus className="h-4 w-4" />
          Invite Member
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search team members..."
          className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => (
          <Card key={member.id}>
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-lg font-bold text-white">
                      {member.avatar}
                    </div>
                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColors[member.status]}`}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <button className="rounded-lg p-1 hover:bg-muted">
                  <MoreVertical className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="truncate">{member.email}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 rounded-lg bg-muted/50 p-3">
                <div>
                  <div className="text-xs text-muted-foreground">Projects</div>
                  <div className="mt-1 text-lg font-semibold">{member.projects}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Active</div>
                  <div className="mt-1 text-lg font-semibold">{member.tasks.active}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Done</div>
                  <div className="mt-1 text-lg font-semibold">{member.tasks.completed}</div>
                </div>
              </div>

              <div className="flex gap-2 pt-2 border-t border-border">
                <button className="flex-1 rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted">
                  View Profile
                </button>
                <button className="flex-1 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
                  Message
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
