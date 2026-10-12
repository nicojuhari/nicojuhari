"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import dynamic from "next/dynamic";
import type Konva from "konva";
import { useLocalStorage, useMediaQuery, useResizeObserver, useWindowSize } from "usehooks-ts";
import {
    AlignCenterHorizontal,
    AlignCenterVertical,
    AlignEndHorizontal,
    AlignEndVertical,
    AlignStartHorizontal,
    AlignStartVertical,
    ArrowDown,
    ArrowUp,
    Copy,
    CopyPlus,
    Download,
    ImagePlus,
    Link2,
    Loader2,
    Maximize,
    Shapes,
    Smile,
    RotateCcw,
    Save,
    Trash2,
    Upload,
    Type,
} from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Chip, Eyebrow, inputClass, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import {
    DEFAULT_DESIGN,
    DEFAULT_TEXT,
    FONTS,
    GRADIENTS,
    loadFont,
    MAX_SIDE,
    MIN_SIDE,
    SIZES,
    TEMPLATES,
    type Design,
    type IconLayer,
    type ImageLayer,
    type Layer,
    type TextLayer,
} from "./data";
import { PlatformIcon } from "./platform-icons";
import { parsePreset, presetToJson, type Preset } from "./preset-file";

// Konva needs the browser canvas - never render it on the server
const DesignStage = dynamic(() => import("./stage"), { ssr: false });
const EmojiPicker = dynamic(() => import("./emoji-picker"), { ssr: false });
const IconPicker = dynamic(() => import("./icon-picker"));

type Format = "image/png" | "image/jpeg" | "image/webp";
const FORMATS: { id: Format; label: string; ext: string }[] = [
    { id: "image/png", label: "PNG", ext: "png" },
    { id: "image/jpeg", label: "JPEG", ext: "jpg" },
    { id: "image/webp", label: "WebP", ext: "webp" },
];
const MAX_PREVIEW_HEIGHT = 640;
/** Room the pinned column needs besides the canvas: site header, toolbar, footer line, padding */
const PINNED_CHROME = 330;
const MAX_FILE_BYTES = 25 * 1024 * 1024;
/** Uploads are stored in the browser, so keep them sharp but not huge */
const MAX_IMAGE_SIDE = 2400;

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function save(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/** Renders the design at its real pixel size, without selection handles */
function exportBlob(stage: Konva.Stage, design: Design, type: Format): Promise<Blob> {
    const ui = stage.findOne(".ui");
    const prev = { w: stage.width(), h: stage.height(), s: stage.scaleX() };
    ui?.hide();
    // Draw at scale 1 so the file is exactly design.width x design.height
    stage.size({ width: design.width, height: design.height });
    stage.scale({ x: 1, y: 1 });
    let canvas: HTMLCanvasElement;
    try {
        canvas = stage.toCanvas({ pixelRatio: 1 });
    } finally {
        stage.size({ width: prev.w, height: prev.h });
        stage.scale({ x: prev.s, y: prev.s });
        ui?.show();
        stage.batchDraw();
    }
    return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("encode"))), type, 0.92));
}

function loadImage(src: string, cors: boolean): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        if (cors) img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = src;
    });
}

/** Reads an uploaded file as a data URL, scaled down to MAX_IMAGE_SIDE */
async function fileToDataUrl(file: File) {
    const url = URL.createObjectURL(file);
    try {
        const img = await loadImage(url, false);
        const s = Math.min(1, MAX_IMAGE_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.naturalWidth * s);
        canvas.height = Math.round(img.naturalHeight * s);
        const ctx = canvas.getContext("2d")!;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        // WebP keeps transparency and is small; browsers without WebP encoding fall back to PNG
        return { src: canvas.toDataURL("image/webp", 0.92), width: canvas.width, height: canvas.height };
    } finally {
        URL.revokeObjectURL(url);
    }
}

/** True when focus is in a field, so keys and paste belong to it, not the canvas */
function isTyping(el: HTMLElement | null) {
    return Boolean(el?.closest?.("input, textarea, select, [contenteditable], emoji-picker"));
}

function Range({ label, value, min, max, step = 1, unit = "", onChange }: { label: string; value: number; min: number; max: number; step?: number; unit?: string; onChange: (n: number) => void }) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="flex justify-between text-[13px] font-semibold text-ink">
                {label}
                <span className="font-mono font-medium text-ink-faint">
                    {value}
                    {unit}
                </span>
            </span>
            <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full accent-brand" />
        </label>
    );
}

function ColorField({ label, value, onChange }: { label: string; value: string; onChange: (hex: string) => void }) {
    const commit = (v: string) => /^#[0-9a-f]{6}$/i.test(v) && onChange(v);
    return (
        <div className="flex min-w-0 flex-col gap-1.5">
            <span className="text-[13px] font-semibold text-ink">{label}</span>
            <div className="flex items-center gap-2">
                <input type="color" value={value} onChange={(e) => onChange(e.target.value)} aria-label={`${label} picker`} className="size-10 shrink-0 cursor-pointer rounded-lg border border-rule bg-white p-0.5" />
                <input
                    key={value}
                    defaultValue={value}
                    onBlur={(e) => commit(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && commit(e.currentTarget.value)}
                    aria-label={`${label} hex`}
                    spellCheck={false}
                    className={cn(inputClass, "h-10 px-3 font-mono text-sm uppercase")}
                />
            </div>
        </div>
    );
}

const iconButton =
    "flex size-10 items-center justify-center rounded-xl border border-rule bg-white text-ink-soft transition-colors hover:border-ink/25 hover:text-ink disabled:opacity-40";
const toolButton = cn(secondaryButton, "h-11 px-4 text-[13px]");
const kbd = "inline-flex min-w-6 items-center justify-center rounded-md border border-rule bg-white px-1.5 py-0.5 font-sans text-[11px] font-semibold text-ink-soft shadow-[0_1px_0_#e6e3dc]";

const insertTools = [
    { id: "text", label: "Text", Icon: Type },
    { id: "emoji", label: "Emoji", Icon: Smile },
    { id: "icon", label: "Icon", Icon: Shapes },
    { id: "image", label: "Image", Icon: ImagePlus },
] as const;

/** A small outline drawn at the format's real proportions */
function RatioShape({ width, height }: { width: number; height: number }) {
    const s = 18 / Math.max(width, height);
    return (
        <span className="flex size-5 shrink-0 items-center justify-center" aria-hidden>
            <span className="rounded-[3px] border-[1.5px] border-current" style={{ width: Math.round(width * s), height: Math.round(height * s) }} />
        </span>
    );
}

export default function Designer() {
    const id = useId();
    const stageRef = useRef<Konva.Stage | null>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [design, setDesign] = useLocalStorage<Design>("nc_social_design", DEFAULT_DESIGN, { initializeWithValue: false });
    const [format, setFormat] = useLocalStorage<Format>("nc_social_format", "image/png", { initializeWithValue: false });
    const [free, setFree] = useLocalStorage("nc_social_free", false, { initializeWithValue: false });
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [fontsVersion, setFontsVersion] = useState(0);
    const [picker, setPicker] = useState<"emoji" | "icon" | "image" | null>(null);
    const [imageUrl, setImageUrl] = useState("");
    const [custom, setCustom] = useState({ w: "", h: "" });
    const [presets, setPresets] = useLocalStorage<Preset[]>("nc_social_presets", [], { initializeWithValue: false });
    const [presetName, setPresetName] = useState("");
    const [confirm, setConfirm] = useState<{ title: string; text: string; label: string; run: () => void } | null>(null);
    const presetFileRef = useRef<HTMLInputElement>(null);
    const thumbSize = useMediaQuery("(min-width: 640px)", { initializeWithValue: false }) ? 200 : 140;
    const [notice, setNotice] = useState("");
    const [busy, setBusy] = useState(false);
    const [dragging, setDragging] = useState(false);

    const { width: boxWidth = 0 } = useResizeObserver({ ref: boxRef as RefObject<HTMLDivElement> });
    const { height: windowHeight = 900 } = useWindowSize({ initializeWithValue: false });
    // The canvas column is pinned while the sidebar scrolls, so it must fit the screen
    const previewHeight = Math.max(280, Math.min(MAX_PREVIEW_HEIGHT, windowHeight - PINNED_CHROME));
    const scale = boxWidth ? Math.min(boxWidth / design.width, previewHeight / design.height) : 0;
    const selected = design.layers.find((l) => l.id === selectedId) ?? null;
    const currentSize = SIZES.find((s) => s.width === design.width && s.height === design.height);
    const sizeId = SIZES.find((s) => s.width === design.width && s.height === design.height)?.id;

    // Load every font the design uses, then redraw so text is measured with it
    const allLayers = [design, ...TEMPLATES.map((t) => t.design), ...presets.map((p) => p.design)].flatMap((d) => d.layers);
    const fontKey = [...new Set(allLayers.flatMap((l) => (l.type === "text" ? [l.font] : [])))].join("|");
    useEffect(() => {
        if (!fontKey) return;
        Promise.all(fontKey.split("|").map(loadFont)).then(() => setFontsVersion((v) => v + 1));
    }, [fontKey]);

    const update = (layerId: string, patch: Partial<Layer>) =>
        setDesign((d) => ({ ...d, layers: d.layers.map((l) => (l.id === layerId ? ({ ...l, ...patch } as Layer) : l)) }));

    const add = (layer: Layer) => {
        setDesign((d) => ({ ...d, layers: [...d.layers, layer] }));
        setSelectedId(layer.id);
    };

    const remove = (layerId: string) => {
        setDesign((d) => ({ ...d, layers: d.layers.filter((l) => l.id !== layerId) }));
        setSelectedId(null);
    };

    const addText = () =>
        add({ ...DEFAULT_TEXT, id: uid(), x: Math.round(design.width * 0.1), y: Math.round(design.height / 2 - 50), width: Math.round(design.width * 0.8) });

    const addEmoji = (emoji: string) => {
        const size = Math.round(Math.min(design.width, design.height) * 0.18);
        const width = Math.round(size * 1.6);
        add({ ...DEFAULT_TEXT, id: uid(), text: emoji, size, width, x: Math.round((design.width - width) / 2), y: Math.round((design.height - size) / 2) });
    };

    const addIcon = (svg: string) => {
        const size = Math.round(Math.min(design.width, design.height) * 0.25);
        add({
            id: uid(),
            type: "icon",
            // Big intrinsic size so the icon stays sharp when drawn large
            svg: svg.replace(/ width="\d+"/, ' width="512"').replace(/ height="\d+"/, ' height="512"'),
            color: "#16284D",
            x: Math.round((design.width - size) / 2),
            y: Math.round((design.height - size) / 2),
            rotation: 0,
            width: size,
            height: size,
            radius: 0,
            borderColor: "#ffffff",
            borderWidth: 0,
        });
    };

    const addImage = (src: string, w: number, h: number) => {
        const s = Math.min(1, (design.width * 0.6) / w, (design.height * 0.6) / h);
        const width = Math.round(w * s);
        const height = Math.round(h * s);
        setPicker(null);
        add({ id: uid(), type: "image", src, x: Math.round((design.width - width) / 2), y: Math.round((design.height - height) / 2), rotation: 0, width, height, radius: 0, borderColor: "#ffffff", borderWidth: 0 });
    };

    const uploadFiles = async (files: FileList | File[]) => {
        setNotice("");
        for (const file of Array.from(files)) {
            if (!file.type.startsWith("image/")) {
                setNotice(`${file.name} is not an image.`);
                continue;
            }
            if (file.size > MAX_FILE_BYTES) {
                setNotice(`${file.name} is over 25 MB.`);
                continue;
            }
            try {
                const img = await fileToDataUrl(file);
                addImage(img.src, img.width, img.height);
            } catch {
                setNotice(`Couldn’t read ${file.name}.`);
            }
        }
    };

    const addFromUrl = async () => {
        let url: URL;
        try {
            url = new URL(imageUrl.trim());
            if (!/^https?:$/.test(url.protocol)) throw new Error();
        } catch {
            return setNotice("Enter a full image link starting with https://");
        }
        setBusy(true);
        try {
            const img = await loadImage(url.href, true);
            addImage(url.href, img.naturalWidth, img.naturalHeight);
            setImageUrl("");
            setNotice("");
        } catch {
            setNotice("That site doesn’t allow its images to be used here. Download the image and upload it instead.");
        } finally {
            setBusy(false);
        }
    };

    const resize = (width: number, height: number) =>
        setDesign((d) => ({
            ...d,
            width,
            height,
            // Keep layers in the same relative spot
            layers: d.layers.map((l) => ({ ...l, x: Math.round((l.x * width) / d.width), y: Math.round((l.y * height) / d.height) })),
        }));

    const customError = (v: string) => (v && !(Number.isInteger(Number(v)) && Number(v) >= MIN_SIDE && Number(v) <= MAX_SIDE) ? `${MIN_SIDE}–${MAX_SIDE} px` : "");
    const setCustomSide = (side: "w" | "h", value: string) => {
        const next = { ...custom, [side]: value.replace(/\D/g, "") };
        setCustom(next);
        const w = Number(next.w || design.width);
        const h = Number(next.h || design.height);
        if (!customError(String(w)) && !customError(String(h))) resize(w, h);
    };

    /** Moves the selected layer so its visible box touches an edge or center of the canvas */
    const align = (edge: "left" | "hcenter" | "right" | "top" | "vcenter" | "bottom") => {
        const node = selected && stageRef.current?.findOne(`#${selected.id}`);
        if (!node) return;
        const box = node.getClientRect({ relativeTo: node.getLayer()! });
        // Edges mean the padding line, so aligned content stays in the safe area
        const p = design.padding ?? 0;
        const dx = edge === "left" ? p - box.x : edge === "hcenter" ? (design.width - box.width) / 2 - box.x : edge === "right" ? design.width - p - box.width - box.x : 0;
        const dy = edge === "top" ? p - box.y : edge === "vcenter" ? (design.height - box.height) / 2 - box.y : edge === "bottom" ? design.height - p - box.height - box.y : 0;
        update(selected.id, { x: Math.round(selected.x + dx), y: Math.round(selected.y + dy) });
    };

    const move = (dir: 1 | -1) =>
        setDesign((d) => {
            const i = d.layers.findIndex((l) => l.id === selectedId);
            const j = i + dir;
            if (i < 0 || j < 0 || j >= d.layers.length) return d;
            const layers = [...d.layers];
            [layers[i], layers[j]] = [layers[j], layers[i]];
            return { ...d, layers };
        });

    const duplicate = () => selected && add({ ...selected, id: uid(), x: selected.x + 30, y: selected.y + 30 });

    const fillCanvas = (layer: ImageLayer) => {
        const s = Math.max(design.width / layer.width, design.height / layer.height);
        const width = Math.round(layer.width * s);
        const height = Math.round(layer.height * s);
        update(layer.id, { width, height, rotation: 0, x: Math.round((design.width - width) / 2), y: Math.round((design.height - height) / 2) });
    };

    // Arrow keys nudge, Delete removes, Esc deselects - but never while typing in a field
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement;
            if (!selected || isTyping(t)) return;
            const step = e.shiftKey ? 10 : 1;
            const nudge: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
            if (nudge[e.key]) {
                e.preventDefault();
                update(selected.id, { x: selected.x + nudge[e.key][0], y: selected.y + nudge[e.key][1] });
            } else if (e.key === "Delete" || e.key === "Backspace") {
                e.preventDefault();
                remove(selected.id);
            } else if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    });

    // ⌘V / Ctrl+V with an image on the clipboard adds it - text fields keep normal paste
    useEffect(() => {
        const onPaste = (e: ClipboardEvent) => {
            const files = Array.from(e.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
            if (!files.length || isTyping(e.target as HTMLElement)) return;
            e.preventDefault();
            uploadFiles(files);
        };
        window.addEventListener("paste", onPaste);
        return () => window.removeEventListener("paste", onPaste);
    });

    const fileName = (ext: string) => `social-image-${design.width}x${design.height}.${ext}`;

    const download = async () => {
        const stage = stageRef.current;
        if (!stage) return;
        setBusy(true);
        setNotice("");
        try {
            save(await exportBlob(stage, design, format), fileName(FORMATS.find((f) => f.id === format)!.ext));
        } catch {
            setNotice("Couldn’t create the image. An image added from a link may be blocking it - upload that image instead.");
        } finally {
            setBusy(false);
        }
    };

    const copy = async () => {
        const stage = stageRef.current;
        if (!stage) return;
        if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") return setNotice("Your browser can’t copy images. Use Download instead.");
        try {
            // Pass the promise straight in - Safari only allows clipboard writes started in the click
            await navigator.clipboard.write([new ClipboardItem({ "image/png": exportBlob(stage, design, "image/png") })]);
            setNotice("Copied as PNG - paste it into your post.");
        } catch {
            setNotice("Couldn’t copy the image. Use Download instead.");
        }
    };

    const applyDesign = (next: Design) => {
        setDesign(next);
        setSelectedId(null);
        setCustom({ w: "", h: "" });
    };

    /** Loads a template or preset - asks first when it would replace someone's work */
    const choose = (next: Design) => {
        if (!design.layers.length) return applyDesign(next);
        setConfirm({ title: "Replace your design?", text: "Your current design will be cleared. Save it as a preset first if you want to keep it.", label: "Replace", run: () => applyDesign(next) });
    };

    const startOver = () =>
        setConfirm({
            title: "Start over?",
            text: "This clears the canvas and keeps the size. It can’t be undone.",
            label: "Start over",
            run: () => applyDesign({ width: design.width, height: design.height, padding: design.padding, background: "#FFFFFF", layers: [] }),
        });

    const savePreset = () => {
        const preset = { id: uid(), name: presetName.trim() || `Design ${presets.length + 1}`, design };
        // Browsers keep about 5 MB per site - big photos won't fit
        if (JSON.stringify([...presets, preset]).length > 4_500_000) return setNotice("Too big to save in this browser. Use Download .json on a preset instead, or use smaller photos.");
        setPresets((list) => [...list, preset]);
        setPresetName("");
        setNotice(`Saved “${preset.name}” to My presets.`);
    };

    const downloadPreset = (preset: Preset) =>
        save(new Blob([presetToJson(preset)], { type: "application/json" }), `${preset.name.replace(/[^\p{L}\p{N}]+/gu, "-").replace(/^-|-$/g, "").toLowerCase() || "preset"}.json`);

    const uploadPreset = async (file: File) => {
        if (file.size > 30 * 1024 * 1024) return setNotice(`${file.name} is too big.`);
        const parsed = parsePreset(await file.text());
        if (!parsed) return setNotice(`${file.name} isn’t a preset file from this tool.`);
        setPresets((list) => [...list, { id: uid(), ...parsed }]);
        setNotice(`Added “${parsed.name}” to My presets.`);
    };

    const deletePreset = (preset: Preset) =>
        setConfirm({ title: `Delete “${preset.name}”?`, text: "It will be removed from this browser.", label: "Delete", run: () => setPresets((list) => list.filter((p) => p.id !== preset.id)) });

    const thumb = (d: Design) => (
        <div className="flex aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-[#eef0f4]">
            <div className="shadow-[0_4px_14px_rgba(22,40,77,0.15)]">
                <DesignStage preview design={d} scale={thumbSize / Math.max(d.width, d.height)} selectedId={null} onSelect={() => {}} onChange={() => {}} fontsVersion={fontsVersion} />
            </div>
        </div>
    );

    // ─── Panels ─────────────────────────────────────────────────────────────

    const textPanel = (layer: TextLayer) => {
        const font = FONTS.find((f) => f.name === layer.font);
        return (
            <>
                <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-ink">Text</span>
                    <textarea
                        value={layer.text}
                        onChange={(e) => update(layer.id, { text: e.target.value })}
                        rows={3}
                        className={cn(inputClass, "h-auto resize-y py-3 text-sm")}
                    />
                </label>
                <label className="flex flex-col gap-1.5">
                    <span className="text-[13px] font-semibold text-ink">Font</span>
                    <select
                        value={layer.font}
                        onChange={(e) => update(layer.id, { font: e.target.value, weight: FONTS.find((f) => f.name === e.target.value)!.weights.includes(layer.weight) ? layer.weight : 400 })}
                        className={cn(inputClass, "h-10 px-3 text-sm")}
                    >
                        {FONTS.map((f) => (
                            <option key={f.name} value={f.name}>
                                {f.name}
                            </option>
                        ))}
                    </select>
                </label>
                <div className="grid grid-cols-2 gap-2">
                    <Chip active={layer.weight === 400} onClick={() => update(layer.id, { weight: 400 })}>
                        Regular
                    </Chip>
                    <Chip active={layer.weight === 700} onClick={() => update(layer.id, { weight: 700 })} className={cn(!font?.weights.includes(700) && "hidden")}>
                        Bold
                    </Chip>
                </div>
                <div className="grid grid-cols-3 gap-2">
                    {(["left", "center", "right"] as const).map((a) => (
                        <Chip key={a} active={layer.align === a} onClick={() => update(layer.id, { align: a })} className="capitalize">
                            {a}
                        </Chip>
                    ))}
                </div>
                <Range label="Size" value={layer.size} min={8} max={400} unit=" px" onChange={(size) => update(layer.id, { size })} />
                <Range label="Line height" value={layer.lineHeight} min={0.8} max={2.5} step={0.05} onChange={(lineHeight) => update(layer.id, { lineHeight })} />
                <ColorField label="Text color" value={layer.color} onChange={(color) => update(layer.id, { color })} />

                <Eyebrow className="pt-2">Box</Eyebrow>
                <div className="flex items-end gap-2">
                    <div className="min-w-0 flex-1">
                        <ColorField label="Background" value={layer.bg || "#ffffff"} onChange={(bg) => update(layer.id, { bg })} />
                    </div>
                    <Chip active={!layer.bg} onClick={() => update(layer.id, { bg: layer.bg ? "" : "#ffffff" })} className="h-10 px-3">
                        None
                    </Chip>
                </div>
                <Range label="Padding" value={layer.padding} min={0} max={120} unit=" px" onChange={(padding) => update(layer.id, { padding })} />
                <Range label="Border" value={layer.borderWidth} min={0} max={30} unit=" px" onChange={(borderWidth) => update(layer.id, { borderWidth })} />
                {layer.borderWidth > 0 && <ColorField label="Border color" value={layer.borderColor} onChange={(borderColor) => update(layer.id, { borderColor })} />}
                <Range label="Corner radius" value={Math.min(layer.radius, 200)} min={0} max={200} unit=" px" onChange={(radius) => update(layer.id, { radius })} />
            </>
        );
    };

    const imagePanel = (layer: ImageLayer) => (
        <>
            <button type="button" onClick={() => fillCanvas(layer)} className={toolButton}>
                <Maximize className="size-4" aria-hidden />
                Fill the canvas
            </button>
            <Range label="Corner radius" value={layer.radius} min={0} max={Math.round(Math.min(layer.width, layer.height) / 2)} unit=" px" onChange={(radius) => update(layer.id, { radius })} />
            <Range label="Border" value={layer.borderWidth} min={0} max={60} unit=" px" onChange={(borderWidth) => update(layer.id, { borderWidth })} />
            {layer.borderWidth > 0 && <ColorField label="Border color" value={layer.borderColor} onChange={(borderColor) => update(layer.id, { borderColor })} />}
        </>
    );

    const iconPanel = (layer: IconLayer) => <ColorField label="Icon color" value={layer.color} onChange={(color) => update(layer.id, { color })} />;

    const alignButtons = [
        { edge: "left", label: "Align left", Icon: AlignStartVertical },
        { edge: "hcenter", label: "Center horizontally", Icon: AlignCenterVertical },
        { edge: "right", label: "Align right", Icon: AlignEndVertical },
        { edge: "top", label: "Align top", Icon: AlignStartHorizontal },
        { edge: "vcenter", label: "Center vertically", Icon: AlignCenterHorizontal },
        { edge: "bottom", label: "Align bottom", Icon: AlignEndHorizontal },
    ] as const;

    return (
        <div>
            {/* Own grid, so the pinned canvas stops where the sidebar ends instead of sliding over the templates */}
            <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
            {/* ── Canvas ── stays in view on desktop while the sidebar scrolls */}
            <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-8 lg:sticky lg:top-20 lg:self-start">
                <div className="flex items-center gap-2">
                    <div role="toolbar" aria-label="Add to design" className="flex min-w-0 flex-1 gap-0.5 rounded-2xl border border-rule bg-white p-1 shadow-[0_1px_2px_rgba(17,20,24,0.04)] sm:flex-none sm:gap-1">
                        {insertTools.map(({ id: tool, label, Icon }) => {
                            const open = picker === tool;
                            return (
                                <button
                                    key={tool}
                                    type="button"
                                    onClick={() => (tool === "text" ? addText() : setPicker(open ? null : tool))}
                                    aria-expanded={tool === "text" ? undefined : open}
                                    className={cn(
                                        "flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 text-[13px] font-semibold transition-colors sm:flex-none sm:gap-2 sm:px-3.5",
                                        open ? "bg-[#eef1f7] text-brand" : "text-ink-soft hover:bg-[#f4f3ef] hover:text-ink"
                                    )}
                                >
                                    <Icon className="size-4 shrink-0" aria-hidden />
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                    <button
                        type="button"
                        onClick={startOver}
                        aria-label="Start over"
                        className="ml-auto flex h-10 shrink-0 items-center gap-2 rounded-xl px-3 text-[13px] font-semibold text-ink-muted transition-colors hover:bg-[#fbeeee] hover:text-destructive"
                    >
                        <RotateCcw className="size-4" aria-hidden />
                        <span className="hidden sm:inline">Start over</span>
                    </button>
                </div>

                {picker && (
                    <div className="overflow-hidden rounded-2xl border border-rule bg-white shadow-[0_6px_24px_rgba(22,40,77,0.08)]">
                        {picker === "emoji" && <EmojiPicker onPick={addEmoji} />}
                        {picker === "icon" && <IconPicker onPick={addIcon} />}
                        {picker === "image" && (
                            <div className="flex flex-col gap-3 p-3">
                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    className="flex flex-col items-center gap-1.5 rounded-xl border-2 border-dashed border-[#d9d5cc] px-4 py-6 text-center transition-colors hover:border-brand/40 hover:bg-[#f7f8fb]"
                                >
                                    <ImagePlus className="size-6 text-brand" aria-hidden />
                                    <span className="text-sm font-semibold text-ink">Upload from your device</span>
                                    <span className="text-[13px] text-ink-faint">JPG, PNG or WebP - or drop it on the canvas</span>
                                </button>
                                <form
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        addFromUrl();
                                    }}
                                    className="flex gap-2"
                                >
                                    <label htmlFor={`${id}-url`} className="sr-only">
                                        Image link
                                    </label>
                                    <div className="relative min-w-0 flex-1">
                                        <Link2 className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-faint" aria-hidden />
                                        <input id={`${id}-url`} value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Paste an image link (https://…)" inputMode="url" className={cn(inputClass, "h-11 pl-10 text-sm")} />
                                    </div>
                                    <button type="submit" disabled={!imageUrl.trim() || busy} className={cn(secondaryButton, "h-11 shrink-0 px-4 text-[13px]")}>
                                        {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : "Add"}
                                    </button>
                                </form>
                                <p className="hidden text-[13px] text-ink-faint sm:block">
                                    Copied an image? Press <kbd className={kbd}>⌘</kbd> <kbd className={kbd}>V</kbd> or <kbd className={kbd}>Ctrl</kbd> <kbd className={kbd}>V</kbd> anywhere on this page.
                                </p>
                            </div>
                        )}
                    </div>
                )}
                <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="sr-only"
                    tabIndex={-1}
                    aria-hidden
                    onChange={(e) => {
                        if (e.target.files) uploadFiles(e.target.files);
                        e.target.value = "";
                    }}
                />

                <div
                    ref={boxRef}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragging(false);
                        uploadFiles(e.dataTransfer.files);
                    }}
                    className={cn(
                        "flex min-h-72 items-center justify-center rounded-2xl bg-[repeating-conic-gradient(#eef0f4_0%_25%,#fff_0%_50%)] bg-[length:16px_16px] outline-2 outline-offset-4 transition-[outline-color]",
                        dragging ? "outline-brand outline-dashed" : "outline-transparent"
                    )}
                >
                    {scale > 0 && (
                        <div className="shadow-[0_8px_30px_rgba(22,40,77,0.15)]">
                            <DesignStage design={design} scale={scale} selectedId={selectedId} onSelect={setSelectedId} onChange={update} fontsVersion={fontsVersion} stageRef={stageRef} free={free} />
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-[13px] text-ink-faint">
                    <span className="flex items-center gap-2">
                        {currentSize?.platforms.map((p) => <PlatformIcon key={p} platform={p} className="size-3.5" />)}
                        <span className="font-semibold text-ink-soft">{currentSize?.label ?? "Custom size"}</span>
                        <span className="tabular-nums">
                            {design.width} × {design.height} px
                        </span>
                    </span>
                    <span className="hidden items-center gap-1.5 sm:flex">
                        <kbd className={kbd}>←</kbd>
                        <kbd className={kbd}>→</kbd> move · <kbd className={kbd}>Shift</kbd> faster · <kbd className={kbd}>Del</kbd> remove
                    </span>
                </div>
                <p aria-live="polite" className="flex min-h-9 justify-center">
                    {notice && <span className="rounded-full bg-[#eef1f7] px-4 py-2 text-center text-[13px] font-medium text-brand">{notice}</span>}
                </p>
            </div>

            {/* ── Settings ── */}
            <div className="border-t border-rule bg-[#f5f7fb] lg:border-t-0 lg:border-l">
                <div className="flex flex-col gap-5 p-5 sm:p-8">
                    {selected ? (
                        <>
                            <div className="flex items-center justify-between">
                                <Eyebrow>{{ text: "Text", image: "Image", icon: "Icon" }[selected.type]}</Eyebrow>
                                <button type="button" onClick={() => setSelectedId(null)} className="text-[13px] font-semibold text-ink-muted hover:text-ink">
                                    Done
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                {alignButtons.map(({ edge, label, Icon }) => (
                                    <button key={edge} type="button" onClick={() => align(edge)} aria-label={label} title={label} className={iconButton}>
                                        <Icon className="size-4" aria-hidden />
                                    </button>
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                                <button type="button" onClick={() => move(1)} aria-label="Bring forward" title="Bring forward" className={iconButton}>
                                    <ArrowUp className="size-4" aria-hidden />
                                </button>
                                <button type="button" onClick={() => move(-1)} aria-label="Send backward" title="Send backward" className={iconButton}>
                                    <ArrowDown className="size-4" aria-hidden />
                                </button>
                                <button type="button" onClick={duplicate} aria-label="Duplicate" title="Duplicate" className={iconButton}>
                                    <CopyPlus className="size-4" aria-hidden />
                                </button>
                                <button type="button" onClick={() => remove(selected.id)} aria-label="Delete" title="Delete" className={cn(iconButton, "hover:text-destructive")}>
                                    <Trash2 className="size-4" aria-hidden />
                                </button>
                            </div>
                            {selected.type === "text" ? textPanel(selected) : selected.type === "icon" ? iconPanel(selected) : imagePanel(selected)}
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col gap-2.5">
                                <Eyebrow>Size</Eyebrow>
                                <div role="group" aria-label="Size" className="grid grid-cols-2 gap-2">
                                    {SIZES.map((s) => {
                                        const active = sizeId === s.id;
                                        return (
                                            <button
                                                key={s.id}
                                                type="button"
                                                aria-pressed={active}
                                                onClick={() => {
                                                    resize(s.width, s.height);
                                                    setCustom({ w: "", h: "" });
                                                }}
                                                className={cn(
                                                    "flex min-w-0 flex-col gap-2 rounded-xl border p-3 text-left transition-colors",
                                                    active ? "border-brand bg-white shadow-[0_0_0_3px_rgba(22,40,77,0.08)]" : "border-rule bg-white hover:border-ink/25"
                                                )}
                                            >
                                                <span className={cn("flex w-full items-center justify-between", active ? "text-brand" : "text-ink-faint")}>
                                                    <span className="flex gap-1.5">
                                                        {s.platforms.map((p) => (
                                                            <PlatformIcon key={p} platform={p} className={cn("size-4", active ? "text-brand" : "text-ink-soft")} />
                                                        ))}
                                                    </span>
                                                    <RatioShape width={s.width} height={s.height} />
                                                </span>
                                                <span className="flex min-w-0 flex-col">
                                                    <span className="truncate text-[13px] font-semibold text-ink">{s.label}</span>
                                                    <span className="text-[11px] text-ink-faint tabular-nums">
                                                        {s.width} × {s.height}
                                                    </span>
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                                <div
                                    className={cn(
                                        "flex h-12 items-center gap-2 rounded-xl border bg-white px-3 transition-colors focus-within:border-brand/40",
                                        !sizeId ? "border-brand shadow-[0_0_0_3px_rgba(22,40,77,0.08)]" : "border-rule"
                                    )}
                                >
                                    <span className={cn("flex-1 text-[13px] font-semibold", !sizeId ? "text-brand" : "text-ink")}>Custom</span>
                                    {(["w", "h"] as const).map((side, i) => (
                                        <span key={side} className="flex items-center gap-2">
                                            {i === 1 && <span className="text-[13px] text-ink-faint" aria-hidden>×</span>}
                                            <input
                                                inputMode="numeric"
                                                value={custom[side]}
                                                onChange={(e) => setCustomSide(side, e.target.value)}
                                                placeholder={String(side === "w" ? design.width : design.height)}
                                                aria-label={side === "w" ? "Custom width in pixels" : "Custom height in pixels"}
                                                aria-invalid={Boolean(customError(custom[side])) || undefined}
                                                className="h-8 w-16 rounded-lg bg-[#f5f7fb] px-2 text-center text-sm text-ink tabular-nums outline-none placeholder:text-ink-faint focus:ring-2 focus:ring-brand/20 aria-invalid:bg-red-50 aria-invalid:ring-2 aria-invalid:ring-destructive/30"
                                            />
                                        </span>
                                    ))}
                                    <span className="text-[13px] text-ink-faint">px</span>
                                </div>
                                {(customError(custom.w) || customError(custom.h)) && <p className="text-[13px] text-destructive">Use a whole number from {MIN_SIDE} to {MAX_SIDE}</p>}
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <Eyebrow>Padding</Eyebrow>
                                <Range label="Space from the edges" value={design.padding ?? 0} min={0} max={200} step={4} unit=" px" onChange={(padding) => setDesign((d) => ({ ...d, padding }))} />
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={!free}
                                    onClick={() => setFree((f) => !f)}
                                    className="flex items-center justify-between gap-3 rounded-xl border border-rule bg-white px-3.5 py-3 text-left transition-colors hover:border-ink/25"
                                >
                                    <span className="flex flex-col gap-0.5">
                                        <span className="text-[13px] font-semibold text-ink">Keep content inside</span>
                                        <span className="text-[12px] text-ink-faint">
                                            {free ? "Content can go past the dashed line and off the edges." : "Content stays inside the dashed line."}
                                        </span>
                                    </span>
                                    <span className={cn("relative h-6 w-10 shrink-0 rounded-full transition-colors", free ? "bg-[#d9d5cc]" : "bg-brand")} aria-hidden>
                                        <span className={cn("absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-[left]", free ? "left-0.5" : "left-[18px]")} />
                                    </span>
                                </button>
                                <p className="text-[13px] text-ink-faint">The dashed line is not in the download.</p>
                            </div>

                            <div className="flex flex-col gap-2.5">
                                <Eyebrow>Background</Eyebrow>
                                <div role="group" aria-label="Background type" className="grid grid-cols-2 gap-2">
                                    <Chip active={!design.gradient} onClick={() => setDesign(({ gradient: _, ...d }) => d)}>
                                        Solid
                                    </Chip>
                                    <Chip active={Boolean(design.gradient)} onClick={() => setDesign((d) => ({ ...d, gradient: d.gradient ?? { to: GRADIENTS[0].to, angle: 135 } }))}>
                                        Gradient
                                    </Chip>
                                </div>
                                {design.gradient && (
                                    <div role="group" aria-label="Ready-made gradients" className="grid grid-cols-6 gap-2">
                                        {GRADIENTS.map((g) => (
                                            <button
                                                key={g.from + g.to}
                                                type="button"
                                                onClick={() => setDesign((d) => ({ ...d, background: g.from, gradient: { to: g.to, angle: g.angle } }))}
                                                aria-label={`Gradient ${g.from} to ${g.to}`}
                                                aria-pressed={design.background === g.from && design.gradient?.to === g.to}
                                                style={{ backgroundImage: `linear-gradient(${g.angle}deg, ${g.from}, ${g.to})` }}
                                                className="aspect-square rounded-xl border border-rule transition-shadow hover:shadow-[0_2px_8px_rgba(22,40,77,0.18)] aria-pressed:ring-2 aria-pressed:ring-brand aria-pressed:ring-offset-2 aria-pressed:ring-offset-[#f5f7fb]"
                                            />
                                        ))}
                                    </div>
                                )}
                                <ColorField label={design.gradient ? "From" : "Color"} value={design.background} onChange={(background) => setDesign((d) => ({ ...d, background }))} />
                                {design.gradient && (
                                    <>
                                        <ColorField label="To" value={design.gradient.to} onChange={(to) => setDesign((d) => ({ ...d, gradient: { angle: 135, ...d.gradient, to } }))} />
                                        <Range
                                            label="Angle"
                                            value={design.gradient.angle}
                                            min={0}
                                            max={360}
                                            step={5}
                                            unit="°"
                                            onChange={(angle) => setDesign((d) => ({ ...d, gradient: { to: d.background, ...d.gradient, angle } }))}
                                        />
                                    </>
                                )}
                            </div>
                        </>
                    )}

                    {/* ── Export ── */}
                    <div className="flex flex-col gap-2.5 border-t border-rule pt-5">
                        <Eyebrow>Download</Eyebrow>
                        <div role="group" aria-label="Format" className="grid grid-cols-3 gap-2">
                            {FORMATS.map((f) => (
                                <Chip key={f.id} active={format === f.id} onClick={() => setFormat(f.id)}>
                                    {f.label}
                                </Chip>
                            ))}
                        </div>
                        <button type="button" onClick={download} disabled={busy || !scale} className={primaryButton}>
                            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
                            Download {design.width}×{design.height}
                        </button>
                        <button type="button" onClick={copy} disabled={busy || !scale} className={secondaryButton}>
                            <Copy className="size-4" aria-hidden />
                            Copy image
                        </button>
                    </div>
                </div>
            </div>

            </div>

            {/* ── Templates + presets ── */}
            <div className="flex flex-col gap-8 border-t border-rule p-5 sm:p-8">
                <section className="flex flex-col gap-3">
                    <Eyebrow>Templates</Eyebrow>
                    <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {TEMPLATES.map((t) => (
                            <li key={t.id}>
                                <button type="button" onClick={() => choose({ padding: design.padding, ...t.design })} className="group flex w-full flex-col gap-2 rounded-2xl border border-rule bg-white p-2 text-left transition-colors hover:border-brand/40">
                                    {thumb(t.design)}
                                    <span className="flex justify-between gap-2 px-1 pb-1 text-[13px] font-semibold text-ink">
                                        {t.label}
                                        <span className="font-mono text-[11px] font-medium text-ink-faint">
                                            {t.design.width}×{t.design.height}
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="flex flex-col gap-3">
                    <Eyebrow>My presets</Eyebrow>
                    <div className="flex flex-wrap gap-2">
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                savePreset();
                            }}
                            className="flex min-w-0 flex-1 gap-2 sm:max-w-md"
                        >
                            <label htmlFor={`${id}-preset`} className="sr-only">
                                Preset name
                            </label>
                            <input id={`${id}-preset`} value={presetName} onChange={(e) => setPresetName(e.target.value)} maxLength={80} placeholder="Name this design" className={cn(inputClass, "h-11 text-sm")} />
                            <button type="submit" className={cn(toolButton, "shrink-0")}>
                                <Save className="size-4" aria-hidden />
                                Save
                            </button>
                        </form>
                        <button type="button" onClick={() => presetFileRef.current?.click()} className={toolButton}>
                            <Upload className="size-4" aria-hidden />
                            Upload .json
                        </button>
                        <input
                            ref={presetFileRef}
                            type="file"
                            accept="application/json,.json"
                            className="sr-only"
                            tabIndex={-1}
                            aria-hidden
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) uploadPreset(file);
                                e.target.value = "";
                            }}
                        />
                    </div>
                    {presets.length ? (
                        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                            {presets.map((p) => (
                                <li key={p.id} className="flex flex-col gap-2 rounded-2xl border border-rule bg-white p-2">
                                    <button type="button" onClick={() => choose({ padding: design.padding, ...p.design })} aria-label={`Use ${p.name}`} className="rounded-xl transition-opacity hover:opacity-90">
                                        {thumb(p.design)}
                                    </button>
                                    <div className="flex items-center gap-1 pl-1">
                                        <span className="min-w-0 flex-1 truncate text-[13px] font-semibold text-ink">{p.name}</span>
                                        <button type="button" onClick={() => downloadPreset(p)} aria-label={`Download ${p.name} as .json`} title="Download .json" className={cn(iconButton, "size-9")}>
                                            <Download className="size-4" aria-hidden />
                                        </button>
                                        <button type="button" onClick={() => deletePreset(p)} aria-label={`Delete ${p.name}`} title="Delete" className={cn(iconButton, "size-9 hover:text-destructive")}>
                                            <Trash2 className="size-4" aria-hidden />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[13px] text-ink-faint">Save a design to reuse it later. Presets stay in this browser - download one as .json to keep a copy or move it to another device.</p>
                    )}
                </section>
            </div>

            <AlertDialog open={confirm !== null} onOpenChange={(open) => !open && setConfirm(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{confirm?.title}</AlertDialogTitle>
                        <AlertDialogDescription>{confirm?.text}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                confirm?.run();
                                setConfirm(null);
                            }}
                        >
                            {confirm?.label}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
