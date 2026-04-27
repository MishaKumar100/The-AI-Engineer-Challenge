"use client"

import { Sparkles } from "lucide-react"

interface SuggestionChipsProps {
  onSelect: (suggestion: string) => void
  disabled?: boolean
}

const suggestions = [
  { label: "What is Bitcoin?", icon: "₿" },
  { label: "What is Ethereum?", icon: "Ξ" },
  { label: "How do I diversify?", icon: "📊" },
  { label: "What is blockchain?", icon: "🔗" },
]

export function SuggestionChips({ onSelect, disabled }: SuggestionChipsProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Sparkles className="w-3.5 h-3.5" />
        <span>Suggested questions</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.label}
            onClick={() => onSelect(suggestion.label)}
            disabled={disabled}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-full border border-border bg-card hover:bg-secondary hover:border-primary/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-base">{suggestion.icon}</span>
            <span>{suggestion.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
