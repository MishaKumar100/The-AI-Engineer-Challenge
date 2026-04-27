"use client"

import { cn } from "@/lib/utils"
import { User, Bot } from "lucide-react"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
}

function formatContent(content: string) {
  // Simple markdown-like formatting
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  
  lines.forEach((line, i) => {
    // Bold text
    let formattedLine: React.ReactNode = line
    
    // Handle **bold** text
    if (line.includes('**')) {
      const parts = line.split(/\*\*(.*?)\*\*/g)
      formattedLine = parts.map((part, j) => 
        j % 2 === 1 ? <strong key={j} className="font-semibold">{part}</strong> : part
      )
    }
    
    // Handle list items
    if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="ml-4 list-disc">
          {typeof formattedLine === 'string' ? formattedLine.substring(2) : formattedLine}
        </li>
      )
    } else if (/^\d+\.\s/.test(line)) {
      elements.push(
        <li key={i} className="ml-4 list-decimal">
          {typeof formattedLine === 'string' ? formattedLine.replace(/^\d+\.\s/, '') : formattedLine}
        </li>
      )
    } else if (line.startsWith('*Note:') || line.startsWith('*Remember:')) {
      elements.push(
        <p key={i} className="text-muted-foreground italic text-sm mt-3">
          {typeof formattedLine === 'string' ? formattedLine.replace(/^\*|\*$/g, '') : formattedLine}
        </p>
      )
    } else if (line.trim() === '') {
      elements.push(<br key={i} />)
    } else {
      elements.push(<p key={i} className="mb-1">{formattedLine}</p>)
    }
  })
  
  return elements
}

export function ChatMessage({ role, content }: ChatMessageProps) {
  const isUser = role === "user"
  
  return (
    <div className={cn(
      "flex gap-3 p-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-5 h-5 text-primary" />
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3",
        isUser 
          ? "bg-primary text-primary-foreground rounded-br-sm" 
          : "bg-card border border-border rounded-bl-sm"
      )}>
        {isUser ? (
          <p className="text-sm leading-relaxed">{content}</p>
        ) : (
          <div className="text-sm leading-relaxed prose-content">
            {formatContent(content)}
          </div>
        )}
      </div>
      
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          <User className="w-5 h-5 text-secondary-foreground" />
        </div>
      )}
    </div>
  )
}
