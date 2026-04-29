"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { DownloadIcon, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type QRCodeStyling from "qr-code-styling"

type DotType = "square" | "rounded" | "classy" | "classy-rounded" | "extra-rounded" | "dots"
type CornerSquareType = "dot" | "square" | "extra-rounded"
type CornerDotType = "dot" | "square"

const DOT_TYPES: DotType[] = ["square", "rounded", "classy", "classy-rounded", "extra-rounded", "dots"]
const CORNER_SQUARE_TYPES: CornerSquareType[] = ["dot", "square", "extra-rounded"]
const CORNER_DOT_TYPES: CornerDotType[] = ["dot", "square"]

export default function QrGenerator() {
  const containerRef = useRef<HTMLDivElement>(null)
  const qrRef = useRef<QRCodeStyling | null>(null)
  const [url, setUrl] = useState("https://")
  const [dotType, setDotType] = useState<DotType>("rounded")
  const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>("extra-rounded")
  const [cornerDotType, setCornerDotType] = useState<CornerDotType>("dot")
  const [fgColor, setFgColor] = useState("#000000")
  const [bgColor, setBgColor] = useState("#ffffff")
  const [size, setSize] = useState(300)
  const [logo, setLogo] = useState<string>("")

  const getOptions = useCallback(() => ({
    width: size,
    height: size,
    data: url || "https://",
    dotsOptions: { type: dotType, color: fgColor },
    cornersSquareOptions: { type: cornerSquareType, color: fgColor },
    cornersDotOptions: { type: cornerDotType, color: fgColor },
    backgroundOptions: { color: bgColor },
    image: logo || undefined,
    imageOptions: { crossOrigin: "anonymous" as const, margin: 8 },
  }), [url, dotType, cornerSquareType, cornerDotType, fgColor, bgColor, size, logo])

  useEffect(() => {
    let mounted = true
    import("qr-code-styling").then(({ default: QRCodeStyling }) => {
      if (!mounted || !containerRef.current) return
      const qr = new QRCodeStyling(getOptions())
      qrRef.current = qr
      containerRef.current.innerHTML = ""
      qr.append(containerRef.current)
    })
    return () => { mounted = false }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    qrRef.current?.update(getOptions())
  }, [getOptions])

  const download = () => {
    qrRef.current?.download({ name: "qr-code", extension: "png" })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setLogo(ev.target?.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Preview */}
      <div className="flex flex-col items-center gap-4">
        <div
          ref={containerRef}
          className="border rounded-xl overflow-hidden bg-white p-2 flex items-center justify-center"
          style={{ width: Math.min(size + 16, 360), height: Math.min(size + 16, 360) }}
        />
        <Button onClick={download} className="gap-2">
          <DownloadIcon className="w-4 h-4" /> Download PNG
        </Button>
      </div>

      {/* Controls */}
      <div className="space-y-5">
        <div className="space-y-1.5">
          <Label>URL</Label>
          <Input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Dots style</Label>
          <div className="flex flex-wrap gap-2">
            {DOT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setDotType(t)}
                className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${dotType === t ? "bg-foreground text-background border-foreground" : "hover:border-foreground/40"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Corner square</Label>
          <div className="flex flex-wrap gap-2">
            {CORNER_SQUARE_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setCornerSquareType(t)}
                className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${cornerSquareType === t ? "bg-foreground text-background border-foreground" : "hover:border-foreground/40"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs uppercase tracking-wide text-muted-foreground">Corner dot</Label>
          <div className="flex flex-wrap gap-2">
            {CORNER_DOT_TYPES.map((t) => (
              <button
                key={t}
                onClick={() => setCornerDotType(t)}
                className={`px-2.5 py-1 rounded-full text-xs border transition-colors ${cornerDotType === t ? "bg-foreground text-background border-foreground" : "hover:border-foreground/40"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Foreground</Label>
            <div className="flex items-center gap-2">
              <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
              <span className="text-sm text-muted-foreground">{fgColor}</span>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Background</Label>
            <div className="flex items-center gap-2">
              <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-8 h-8 rounded border cursor-pointer" />
              <span className="text-sm text-muted-foreground">{bgColor}</span>
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <Label>Size: {size}px</Label>
          <input
            type="range"
            min={200}
            max={500}
            step={10}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-foreground"
          />
        </div>

        <div className="space-y-1.5">
          <Label className="flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5" /> Center logo (optional)
          </Label>
          <input type="file" accept="image/*" onChange={handleLogoUpload} className="text-sm" />
          {logo && (
            <Button variant="ghost" size="sm" onClick={() => setLogo("")}>Remove logo</Button>
          )}
        </div>
      </div>
    </div>
  )
}
