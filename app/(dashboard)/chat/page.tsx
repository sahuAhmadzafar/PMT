"use client"

import { useState } from "react"
import { Search, Send, Smile, Paperclip, Hash, Plus, MoreVertical } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  user: string
  avatar: string
  content: string
  timestamp: Date
  reactions?: { emoji: string; count: number }[]
}

interface Channel {
  id: string
  name: string
  type: "channel" | "dm"
  unread?: number
}

const channels: Channel[] = [
  { id: "1", name: "general", type: "channel", unread: 3 },
  { id: "2", name: "design", type: "channel" },
  { id: "3", name: "development", type: "channel", unread: 1 },
  { id: "4", name: "marketing", type: "channel" },
]

const directMessages: Channel[] = [
  { id: "dm-1", name: "Sarah Miller", type: "dm", unread: 2 },
  { id: "dm-2", name: "Alex Kim", type: "dm" },
  { id: "dm-3", name: "Mike Brown", type: "dm" },
]

const initialMessages: Message[] = [
  {
    id: "1",
    user: "Sarah Miller",
    avatar: "SM",
    content: "Hey team! Just finished the new design mockups. Would love to get your feedback.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    reactions: [
      { emoji: "👍", count: 3 },
      { emoji: "🎨", count: 1 },
    ],
  },
  {
    id: "2",
    user: "Alex Kim",
    avatar: "AK",
    content: "Looking great! The color scheme is perfect. When can we start implementing this?",
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: "3",
    user: "John Doe",
    avatar: "JD",
    content: "I agree! Let's aim to start development next week. We should discuss the technical requirements first.",
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
    reactions: [{ emoji: "✅", count: 2 }],
  },
  {
    id: "4",
    user: "Mike Brown",
    avatar: "MB",
    content: "I can help with the backend integration. Let me know what APIs we need.",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "5",
    user: "Sarah Miller",
    avatar: "SM",
    content: "Perfect! I'll share the Figma file in the design channel. Also added some notes about the user flow.",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
  },
]

function formatTime(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))

  if (minutes < 1) return "just now"
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })
}

export default function ChatPage() {
  const [selectedChannel, setSelectedChannel] = useState(channels[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")

  const sendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      user: "John Doe",
      avatar: "JD",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages([...messages, newMessage])
    setInputValue("")
  }

  return (
    <div className="flex h-[calc(100vh-6rem)] gap-6">
      <div className="w-64 space-y-6">
        <Card className="p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg border border-border bg-muted/50 py-2 pl-9 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">Channels</h3>
                <button className="rounded p-0.5 hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      selectedChannel.id === channel.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" />
                      <span>{channel.name}</span>
                    </div>
                    {channel.unread && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
                        {channel.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-muted-foreground">Direct Messages</h3>
                <button className="rounded p-0.5 hover:bg-muted">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-1">
                {directMessages.map((dm) => (
                  <button
                    key={dm.id}
                    onClick={() => setSelectedChannel(dm)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      selectedChannel.id === dm.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-success" />
                      <span>{dm.name}</span>
                    </div>
                    {dm.unread && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs font-bold text-white">
                        {dm.unread}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="flex flex-1 flex-col">
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-2">
            <Hash className="h-5 w-5 text-muted-foreground" />
            <h2 className="text-lg font-semibold">{selectedChannel.name}</h2>
          </div>
          <button className="rounded-lg p-2 hover:bg-muted">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className="flex gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-sm font-bold text-white">
                {message.avatar}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">{message.user}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
                </div>
                <p className="text-sm leading-relaxed">{message.content}</p>
                {message.reactions && (
                  <div className="flex gap-2 pt-1">
                    {message.reactions.map((reaction, idx) => (
                      <button
                        key={idx}
                        className="flex items-center gap-1 rounded-full border border-border bg-muted/50 px-2 py-0.5 text-xs hover:bg-muted"
                      >
                        <span>{reaction.emoji}</span>
                        <span>{reaction.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border p-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
                placeholder={`Message #${selectedChannel.name}`}
                className="w-full resize-none rounded-lg border border-border bg-muted/50 p-3 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
              />
              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-2">
                  <button className="rounded-lg p-2 hover:bg-muted">
                    <Paperclip className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 hover:bg-muted">
                    <Smile className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={sendMessage}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
