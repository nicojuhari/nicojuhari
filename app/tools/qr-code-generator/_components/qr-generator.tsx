"use client"

import { useEffect, useRef, useState } from "react"
import { ImageIcon, Minus, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type DotType = "square" | "rounded" | "extra-rounded" | "dots" | "classy"
type CornerSquareType = "square" | "extra-rounded" | "dot" | null
type CornerDotType = "square" | "dot" | null

// ─── Style preview icons ──────────────────────────────────────────────────────

function DotIcon({ shape }: { shape: DotType }) {
    const items = Array.from({ length: 16 }, (_, i) => ({ r: Math.floor(i / 4), c: i % 4 }))
    return (
        <svg viewBox="0 0 46 46" fill="currentColor" className="w-full h-full">
            {items.map(({ r, c }) => {
                const x = c * 12 + 1
                const y = r * 12 + 1
                if (shape === "dots") return <circle key={`${r}-${c}`} cx={x + 5} cy={y + 5} r={5} />
                if (shape === "rounded") return <rect key={`${r}-${c}`} x={x} y={y} width={10} height={10} rx={3} />
                if (shape === "extra-rounded") return <rect key={`${r}-${c}`} x={x} y={y} width={10} height={10} rx={5} />
                if (shape === "classy") return <path key={`${r}-${c}`} d={`M${x} ${y} h10 v7 l-3 3 H${x} z`} />
                return <rect key={`${r}-${c}`} x={x} y={y} width={10} height={10} />
            })}
        </svg>
    )
}

function CornerIcon({ shape }: { shape: "square" | "extra-rounded" | "dot" }) {
    if (shape === "dot")
        return (
            <svg viewBox="0 0 48 48" fill="currentColor" className="w-full h-full">
                <circle cx={24} cy={24} r={23} />
                <circle cx={24} cy={24} r={15} fill="white" />
                <circle cx={24} cy={24} r={8} />
            </svg>
        )
    if (shape === "extra-rounded")
        return (
            <svg viewBox="0 0 48 48" fill="currentColor" className="w-full h-full">
                <rect width={48} height={48} rx={13} />
                <rect x={7} y={7} width={34} height={34} rx={8} fill="white" />
                <rect x={15} y={15} width={18} height={18} rx={4} />
            </svg>
        )
    return (
        <svg viewBox="0 0 48 48" fill="currentColor" className="w-full h-full">
            <rect width={48} height={48} />
            <rect x={7} y={7} width={34} height={34} fill="white" />
            <rect x={15} y={15} width={18} height={18} />
        </svg>
    )
}

function CornerDotIcon({ shape }: { shape: "square" | "dot" }) {
    return (
        <svg viewBox="0 0 48 48" fill="currentColor" className="w-full h-full">
            <rect width={48} height={48} opacity={0.12} />
            <rect x={6} y={6} width={36} height={36} fill="white" />
            {shape === "dot" ? (
                <circle cx={24} cy={24} r={10} />
            ) : (
                <rect x={14} y={14} width={20} height={20} />
            )}
        </svg>
    )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ColorSwatch({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-border hover:border-foreground/30 transition-colors">
            <div className="relative w-9 h-9 rounded shrink-0 overflow-hidden border border-border/60">
                <div className="absolute inset-0" style={{ backgroundColor: value }} />
                <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
            </div>
            <div>
                <p className="text-sm font-medium leading-none mb-1">{label}</p>
                <p className="text-xs text-muted-foreground font-mono">{value}</p>
            </div>
        </label>
    )
}

function StyleBtn({
    active,
    onClick,
    title,
    children,
}: {
    active: boolean
    onClick: () => void
    title?: string
    children: React.ReactNode
}) {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`w-12 h-12 rounded-lg border-2 transition-all flex items-center justify-center p-1.5 ${
                active
                    ? "border-foreground bg-foreground/5 shadow-sm"
                    : "border-border hover:border-foreground/40"
            }`}
        >
            {children}
        </button>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{children}</p>
    )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QrGenerator() {
    const containerRef = useRef<HTMLDivElement>(null)
    const [url, setUrl] = useState("https://nicojuhari.com")
    const [dotType, setDotType] = useState<DotType>("dots")
    const [dotColor, setDotColor] = useState("#564b3e")
    const [bgColor, setBgColor] = useState("#ffffff")
    const [cornerSquareType, setCornerSquareType] = useState<CornerSquareType>("extra-rounded")
    const [cornerSquareColor, setCornerSquareColor] = useState("#324b62")
    const [cornerDotType, setCornerDotType] = useState<CornerDotType>("dot")
    const [cornerDotColor, setCornerDotColor] = useState("#2c2811")
    const [margin, setMargin] = useState(0)
    const [downloadSize, setDownloadSize] = useState(600)
    const [logo, setLogo] = useState("")
    const [logoSize, setLogoSize] = useState(0.4)
    const [logoFileName, setLogoFileName] = useState("")

    useEffect(() => {
        let cancelled = false
        const options = {
            width: 280,
            height: 280,
            type: "svg" as const,
            data: url || "https://",
            margin: margin * 9,
            qrOptions: { errorCorrectionLevel: "Q" as const },
            dotsOptions: { type: dotType, color: dotColor },
            cornersSquareOptions: cornerSquareType
                ? { type: cornerSquareType, color: cornerSquareColor }
                : { color: cornerSquareColor },
            cornersDotOptions: cornerDotType
                ? { type: cornerDotType, color: cornerDotColor }
                : { color: cornerDotColor },
            backgroundOptions: { color: bgColor },
            image: logo || undefined,
            imageOptions: {
                crossOrigin: "anonymous" as const,
                hideBackgroundDots: true,
                imageSize: logoSize,
                margin: 0,
            },
        }
        import("qr-code-styling").then(({ default: QRCodeStyling }) => {
            if (cancelled || !containerRef.current) return
            const qr = new QRCodeStyling(options)
            containerRef.current.innerHTML = ""
            qr.append(containerRef.current)
        })
        return () => {
            cancelled = true
        }
    }, [url, dotType, dotColor, bgColor, cornerSquareType, cornerSquareColor, cornerDotType, cornerDotColor, margin, logo, logoSize])

    const download = (ext: "png" | "jpeg" | "svg") => {
        import("qr-code-styling").then(({ default: QRCodeStyling }) => {
            const options = {
                width: downloadSize,
                height: downloadSize,
                type: ext === "svg" ? ("svg" as const) : ("canvas" as const),
                data: url || "https://",
                margin: margin * 9,
                qrOptions: { errorCorrectionLevel: "Q" as const },
                dotsOptions: { type: dotType, color: dotColor },
                cornersSquareOptions: cornerSquareType
                    ? { type: cornerSquareType, color: cornerSquareColor }
                    : { color: cornerSquareColor },
                cornersDotOptions: cornerDotType
                    ? { type: cornerDotType, color: cornerDotColor }
                    : { color: cornerDotColor },
                backgroundOptions: { color: ext === "png" ? "transparent" : bgColor },
                image: logo || undefined,
                imageOptions: {
                    crossOrigin: "anonymous" as const,
                    hideBackgroundDots: true,
                    imageSize: logoSize,
                    margin: 0,
                },
            }
            const qr = new QRCodeStyling(options)
            setTimeout(() => qr.download({ name: "qr-code", extension: ext }), 300)
        })
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = (ev) => setLogo(ev.target?.result as string)
        reader.readAsDataURL(file)
        setLogoFileName(file.name)
    }

    const clearLogo = () => {
        setLogo("")
        setLogoFileName("")
        setLogoSize(0.4)
    }

    const adjustLogoSize = (dir: "up" | "down") => {
        setLogoSize((prev) => {
            if (dir === "up" && prev < 0.5) return +((prev + 0.1).toFixed(1))
            if (dir === "down" && prev > 0.1) return +((prev - 0.1).toFixed(1))
            return prev
        })
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* ── Controls ── */}
            <div className="lg:col-span-2 space-y-7">
                <div className="space-y-1.5">
                    <Label>Your URL</Label>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://"
                        className="text-base h-11"
                    />
                </div>

                {/* Colors */}
                <div className="space-y-3">
                    <SectionLabel>Colors</SectionLabel>
                    <div className="grid grid-cols-2 gap-3">
                        <ColorSwatch label="Dots" value={dotColor} onChange={setDotColor} />
                        <ColorSwatch label="Background" value={bgColor} onChange={setBgColor} />
                        <ColorSwatch label="Corner Shape" value={cornerSquareColor} onChange={setCornerSquareColor} />
                        <ColorSwatch label="Corner Dot" value={cornerDotColor} onChange={setCornerDotColor} />
                    </div>
                </div>

                {/* Body Shape */}
                <div className="space-y-3">
                    <SectionLabel>Body Shape</SectionLabel>
                    <div className="flex gap-2 flex-wrap">
                        {(
                            [
                                ["square", "Square"],
                                ["rounded", "Rounded"],
                                ["extra-rounded", "Extra Rounded"],
                                ["dots", "Dots"],
                                ["classy", "Classy"],
                            ] as [DotType, string][]
                        ).map(([type, label]) => (
                            <StyleBtn
                                key={type}
                                active={dotType === type}
                                onClick={() => setDotType(type)}
                                title={label}
                            >
                                <DotIcon shape={type} />
                            </StyleBtn>
                        ))}
                    </div>
                </div>

                {/* Corner Shape */}
                <div className="space-y-3">
                    <SectionLabel>Corner Shape</SectionLabel>
                    <div className="flex gap-2 flex-wrap">
                        <StyleBtn
                            active={cornerSquareType === null}
                            onClick={() => setCornerSquareType(null)}
                            title="Default"
                        >
                            <span className="text-muted-foreground font-medium text-base">—</span>
                        </StyleBtn>
                        {(
                            [
                                ["square", "Square"],
                                ["extra-rounded", "Rounded"],
                                ["dot", "Circle"],
                            ] as ["square" | "extra-rounded" | "dot", string][]
                        ).map(([type, label]) => (
                            <StyleBtn
                                key={type}
                                active={cornerSquareType === type}
                                onClick={() => setCornerSquareType(type)}
                                title={label}
                            >
                                <CornerIcon shape={type} />
                            </StyleBtn>
                        ))}
                    </div>
                </div>

                {/* Corner Dot */}
                <div className="space-y-3">
                    <SectionLabel>Corner Dot</SectionLabel>
                    <div className="flex gap-2 flex-wrap">
                        <StyleBtn
                            active={cornerDotType === null}
                            onClick={() => setCornerDotType(null)}
                            title="Default"
                        >
                            <span className="text-muted-foreground font-medium text-base">—</span>
                        </StyleBtn>
                        {(
                            [
                                ["square", "Square"],
                                ["dot", "Circle"],
                            ] as ["square" | "dot", string][]
                        ).map(([type, label]) => (
                            <StyleBtn
                                key={type}
                                active={cornerDotType === type}
                                onClick={() => setCornerDotType(type)}
                                title={label}
                            >
                                <CornerDotIcon shape={type} />
                            </StyleBtn>
                        ))}
                    </div>
                </div>

                {/* Margin */}
                <div className="space-y-3">
                    <SectionLabel>Margin</SectionLabel>
                    <div className="flex gap-2">
                        {[0, 1, 2, 3].map((m) => (
                            <button
                                key={m}
                                onClick={() => setMargin(m)}
                                className={`w-12 h-10 rounded-lg border-2 text-sm font-medium transition-all ${
                                    margin === m
                                        ? "border-foreground bg-foreground text-background"
                                        : "border-border hover:border-foreground/40"
                                }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Logo */}
                <div className="space-y-3">
                    <SectionLabel>Center Logo (optional)</SectionLabel>
                    <div className="flex gap-3 items-center">
                        {logoFileName ? (
                            <button
                                onClick={clearLogo}
                                className="w-12 h-12 rounded-lg border-2 border-border flex items-center justify-center hover:border-destructive hover:text-destructive transition-colors shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        ) : (
                            <label className="w-12 h-12 rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-foreground/40 transition-colors shrink-0">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoUpload}
                                    className="hidden"
                                />
                                <ImageIcon className="w-5 h-5 text-muted-foreground" />
                            </label>
                        )}
                        {logoFileName ? (
                            <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                                {logoFileName}
                            </span>
                        ) : (
                            <span className="text-sm text-muted-foreground">Upload an image to embed in the center</span>
                        )}
                    </div>
                    {logo && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">Logo size</span>
                            <div className="flex items-center border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => adjustLogoSize("down")}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                                >
                                    <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center text-sm tabular-nums">
                                    {Math.round(logoSize * 10)}
                                </span>
                                <button
                                    onClick={() => adjustLogoSize("up")}
                                    className="w-9 h-9 flex items-center justify-center hover:bg-muted transition-colors"
                                >
                                    <Plus className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Preview + Download ── */}
            <div className="space-y-5">
                <div
                    ref={containerRef}
                    className="border rounded-xl bg-white p-3 flex items-center justify-center"
                    style={{ width: 304, height: 304 }}
                />

                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Download quality</span>
                        <span className="tabular-nums">
                            {downloadSize} × {downloadSize}px
                        </span>
                    </div>
                    <input
                        type="range"
                        min={200}
                        max={2000}
                        step={100}
                        value={downloadSize}
                        onChange={(e) => setDownloadSize(Number(e.target.value))}
                        className="w-full accent-foreground"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low</span>
                        <span>High</span>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" size="sm" onClick={() => download("png")}>
                        PNG
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => download("jpeg")}>
                        JPEG
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => download("svg")}>
                        SVG
                    </Button>
                </div>
                <p className="text-xs text-muted-foreground">PNG saves with transparent background.</p>
            </div>
        </div>
    )
}
