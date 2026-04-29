"use client"

import { useState, useMemo } from "react"
import { XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

function StatCell({ value, label }: { value: number | string; label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center p-3">
      <span className="text-2xl font-semibold">{value}</span>
      <span className="text-xs text-muted-foreground leading-tight">{label}</span>
    </div>
  )
}

export default function WordCounter() {
  const [text, setText] = useState("")

  const stats = useMemo(() => {
    const trimmed = text.trim()
    return {
      words: trimmed ? trimmed.split(/\s+/).length : 0,
      spaces: Math.max(text.split(" ").length - 1, 0),
      chars: text.length,
      charsNoSpaces: text.replace(/\s/g, "").length,
      sentences: trimmed ? text.split(/[.!?]+/).length - 1 : 0,
      lines: trimmed ? trimmed.split(/\r\n|\r|\n/).length : 0,
      readingTime: Math.ceil((trimmed ? trimmed.split(/\s+/).length : 0) / 200),
    }
  }, [text])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your text here…"
          className="w-full min-h-[420px] resize-none text-sm"
        />
        {text && (
          <Button
            variant="ghost"
            size="icon-sm"
            title="Clear text"
            className="absolute bottom-2 right-2"
            onClick={() => setText("")}
          >
            <XIcon className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="border rounded-xl bg-white divide-y">
        <div className="grid grid-cols-2 divide-x">
          <StatCell value={stats.words} label="Words" />
          <StatCell value={stats.spaces} label="Spaces" />
        </div>
        <div className="grid grid-cols-2 divide-x">
          <StatCell value={stats.chars} label="Characters" />
          <StatCell value={stats.charsNoSpaces} label="Chars w/o spaces" />
        </div>
        <div className="grid grid-cols-2 divide-x">
          <StatCell value={stats.sentences} label="Sentences" />
          <StatCell value={stats.lines} label="Lines" />
        </div>
        <StatCell value={`${stats.readingTime} min`} label="Reading Time" />
      </div>
    </div>
  )
}
