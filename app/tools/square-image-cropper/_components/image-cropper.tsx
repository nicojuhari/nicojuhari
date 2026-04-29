"use client"

import { useState, useRef } from "react"
import { Cropper, ImageRestriction, type CropperRef } from "react-advanced-cropper"
import "react-advanced-cropper/dist/style.css"
import { FlipHorizontal2Icon, FlipVertical2Icon, RotateCwIcon, RotateCcwIcon, TrashIcon, DownloadIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const SIZE_PRESETS = [600, 800, 1000]

export default function ImageCropper() {
  const cropperRef = useRef<CropperRef>(null)
  const [src, setSrc] = useState<string>("")
  const [fileType, setFileType] = useState("image/png")
  const [fileName, setFileName] = useState("cropped-image")
  const [outputSize, setOutputSize] = useState(800)
  const [customSize, setCustomSize] = useState("800")
  const [preview, setPreview] = useState<string>("")

  const handleFile = (file: File) => {
    setFileType(file.type)
    setFileName(file.name.replace(/\.[^.]+$/, ""))
    setSrc(URL.createObjectURL(file))
    setPreview("")
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith("image/")) handleFile(file)
  }

  const onChange = (cropper: CropperRef) => {
    const canvas = cropper.getCanvas({ width: outputSize, height: outputSize })
    if (canvas) setPreview(canvas.toDataURL(fileType))
  }

  const download = () => {
    if (!preview) return
    const a = document.createElement("a")
    a.href = preview
    a.download = `${fileName}.${fileType.split("/")[1]}`
    a.click()
  }

  const reset = () => {
    setSrc("")
    setPreview("")
  }

  const setSize = (size: number) => {
    setOutputSize(size)
    setCustomSize(String(size))
  }

  if (!src) {
    return (
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed rounded-xl p-12 text-center cursor-pointer hover:border-foreground/40 transition-colors bg-white"
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <p className="text-muted-foreground text-sm">Drop an image here or click to upload</p>
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
      </div>
    )
  }

  return (
    <div className="border rounded-xl p-4 bg-white space-y-4">
      <Cropper
        ref={cropperRef}
        src={src}
        stencilProps={{ aspectRatio: 1 }}
        imageRestriction={ImageRestriction.fitArea}
        className="max-h-[500px] bg-muted rounded-lg"
        onChange={onChange}
      />

      <div className="flex flex-wrap gap-2 justify-center">
        <Button variant="outline" size="icon" onClick={() => cropperRef.current?.flipImage(true, false)} title="Flip horizontal">
          <FlipHorizontal2Icon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => cropperRef.current?.flipImage(false, true)} title="Flip vertical">
          <FlipVertical2Icon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => cropperRef.current?.rotateImage(90)} title="Rotate right">
          <RotateCwIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => cropperRef.current?.rotateImage(-90)} title="Rotate left">
          <RotateCcwIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {SIZE_PRESETS.map((s) => (
          <Button
            key={s}
            variant={outputSize === s ? "default" : "outline"}
            size="sm"
            onClick={() => setSize(s)}
          >
            {s}×{s}
          </Button>
        ))}
        <Input
          type="number"
          min={300}
          max={2000}
          step={10}
          value={customSize}
          onChange={(e) => { setCustomSize(e.target.value); setOutputSize(Number(e.target.value)) }}
          className="w-24 text-sm"
          placeholder="Custom"
        />
      </div>

      <div className="flex justify-between">
        <Button variant="ghost" size="icon" onClick={reset} title="Reset" className="text-destructive hover:text-destructive">
          <TrashIcon className="w-4 h-4" />
        </Button>
        {preview && (
          <Button onClick={download} className="gap-2">
            <DownloadIcon className="w-4 h-4" /> Download
          </Button>
        )}
      </div>
    </div>
  )
}
