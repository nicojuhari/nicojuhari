"use client"

import { useState, useMemo } from "react"
import { XIcon, CopyIcon, CheckIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

const REPLACE_OPTIONS = ["dashes", "underscores", "slashes", "keep spaces", "new line", "remove all spaces"] as const
const REPLACE_SYMBOLS: Record<string, string> = {
  dashes: "-", underscores: "_", slashes: "/", "keep spaces": " ", "new line": "\n", "remove all spaces": "",
}
const TRANSFORM_OPTIONS = ["none", "lowercase", "uppercase", "capitalize"] as const

type ReplaceOption = (typeof REPLACE_OPTIONS)[number]
type TransformOption = (typeof TRANSFORM_OPTIONS)[number]

export default function WhitespaceRemover() {
  const [text, setText] = useState("")
  const [replaceWith, setReplaceWith] = useState<ReplaceOption>("dashes")
  const [transform, setTransform] = useState<TransformOption>("none")
  const [keepNewlines, setKeepNewlines] = useState(false)
  const [reverseText, setReverseText] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => {
    if (!text) return ""
    let out = text.trim()
    const symbol = REPLACE_SYMBOLS[replaceWith]

    if (keepNewlines) {
      out = out.replace(/ +/g, symbol)
    } else {
      out = out.replace(/\s+/g, symbol)
    }

    if (transform === "lowercase") out = out.toLowerCase()
    else if (transform === "uppercase") out = out.toUpperCase()
    else if (transform === "capitalize") {
      out = out.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase())
    }

    if (reverseText) out = out.split("").reverse().join("")

    if (keepNewlines) {
      out = out.split("\n").map((l) => l.trim().replace(/^[-_/ ]+|[-_/ ]+$/g, "")).join("\n")
    }

    return out
  }, [text, replaceWith, transform, keepNewlines, reverseText])

  const copy = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const displayResult = keepNewlines || replaceWith === "new line"
    ? result.split("\n").join("<br>")
    : result

  return (
    <div className="space-y-6">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add your text here…"
          className="w-full min-h-[160px] resize-none text-sm"
        />
        {text && (
          <Button variant="ghost" size="icon-sm" className="absolute bottom-2 right-2" onClick={() => setText("")}>
            <XIcon className="w-4 h-4" />
          </Button>
        )}
      </div>

      {result && (
        <div>
          <div
            className="border rounded-lg p-3 bg-white text-sm min-h-[60px] max-h-[200px] overflow-y-auto break-all"
            dangerouslySetInnerHTML={{ __html: displayResult }}
          />
          <div className="flex justify-end mt-2">
            <Button variant="outline" size="sm" onClick={copy} className="gap-1.5">
              {copied ? <CheckIcon className="w-3.5 h-3.5" /> : <CopyIcon className="w-3.5 h-3.5" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      )}

      <div className="border rounded-xl p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-3 block">Replace with</Label>
          <div className="space-y-1.5">
            {REPLACE_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="replace"
                  value={opt}
                  checked={replaceWith === opt}
                  onChange={() => setReplaceWith(opt)}
                  className="accent-foreground"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-3 block">Transform</Label>
          <div className="space-y-1.5">
            {TRANSFORM_OPTIONS.map((opt) => (
              <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="transform"
                  value={opt}
                  checked={transform === opt}
                  onChange={() => setTransform(opt)}
                  className="accent-foreground"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Separator className="sm:hidden" />
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" checked={reverseText} onChange={(e) => setReverseText(e.target.checked)} className="accent-foreground" />
            Reverse the text
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" checked={keepNewlines} onChange={(e) => setKeepNewlines(e.target.checked)} className="accent-foreground" />
            Keep new lines
          </label>
        </div>
      </div>
    </div>
  )
}
