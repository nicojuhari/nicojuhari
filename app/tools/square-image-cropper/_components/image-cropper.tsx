"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Cropper, drawCroppedArea, ImageRestriction, type CropperRef, type CropperState } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import {
    AlertTriangle,
    Download,
    FlipHorizontal2,
    FlipVertical2,
    ImagePlus,
    Loader2,
    Plus,
    RotateCcw,
    RotateCw,
    Undo2,
    X,
    ZoomIn,
    ZoomOut,
} from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { Chip, Eyebrow, inputClass, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import { createZip } from "./zip";

type Item = { id: string; name: string; url: string; img: HTMLImageElement; width: number; height: number };
type Format = "image/jpeg" | "image/webp" | "image/png";
type Output = { size: number; format: Format; quality: number };

const SIZE_PRESETS = [600, 800, 1000, 1200];
const MIN_SIZE = 100;
const MAX_SIZE = 4000;
const MAX_FILES = 30;
const MAX_FILE_BYTES = 25 * 1024 * 1024;
const FORMATS: { id: Format; label: string; ext: string; hint: string }[] = [
    { id: "image/jpeg", label: "JPEG", ext: "jpg", hint: "Smallest for photos. Transparent areas turn white." },
    { id: "image/webp", label: "WebP", ext: "webp", hint: "Smaller than JPEG, supported by all modern browsers." },
    { id: "image/png", label: "PNG", ext: "png", hint: "Lossless and keeps transparency, but files are larger." },
];

function uid() {
    return Math.random().toString(36).slice(2, 10);
}

function baseName(name: string) {
    return name.replace(/\.[^.]+$/, "").replace(/[^\p{L}\p{N}._-]+/gu, "-").replace(/^-+|-+$/g, "") || "image";
}

/** Centered square crop - used for images that were never opened in the editor */
function defaultState(item: Item): CropperState {
    const side = Math.min(item.width, item.height);
    return {
        boundary: { width: item.width, height: item.height },
        imageSize: { width: item.width, height: item.height },
        transforms: { rotate: 0, flip: { horizontal: false, vertical: false } },
        visibleArea: { left: 0, top: 0, width: item.width, height: item.height },
        coordinates: { left: (item.width - side) / 2, top: (item.height - side) / 2, width: side, height: side },
    } as CropperState;
}

function loadImage(file: File): Promise<Item> {
    return new Promise((resolve, reject) => {
        const url = URL.createObjectURL(file);
        const img = new Image();
        img.onload = () => resolve({ id: uid(), name: file.name, url, img, width: img.naturalWidth, height: img.naturalHeight });
        img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error(file.name));
        };
        img.src = url;
    });
}

function render(item: Item, state: CropperState, output: Output): Promise<Blob> {
    const result = document.createElement("canvas");
    const spare = document.createElement("canvas");
    const canvas = drawCroppedArea(state, item.img, result, spare, {
        width: output.size,
        height: output.size,
        fillColor: output.format === "image/png" ? "transparent" : "#ffffff",
        imageSmoothingQuality: "high",
    });
    return new Promise((resolve, reject) => {
        if (!canvas) return reject(new Error("render"));
        canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("encode"))), output.format, output.quality / 100);
    });
}

function save(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function formatBytes(bytes: number) {
    return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function ImageCropper() {
    const id = useId();
    const cropperRef = useRef<CropperRef>(null);
    const fileRef = useRef<HTMLInputElement>(null);
    const states = useRef(new Map<string, CropperState>());
    const frame = useRef(0);
    /** Id of the image whose editor finished loading - changes before that are the editor's own setup */
    const readyFor = useRef<string | null>(null);

    const [items, setItems] = useState<Item[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [output, setOutput] = useLocalStorage<Output>("nc_cropper_output", { size: 800, format: "image/jpeg", quality: 90 }, { initializeWithValue: false });
    const [customSize, setCustomSize] = useState("");
    const [preview, setPreview] = useState("");
    const [cropSide, setCropSide] = useState(0);
    const [errors, setErrors] = useState<string[]>([]);
    const [busy, setBusy] = useState(false);
    const [estimate, setEstimate] = useState("");
    const [dragging, setDragging] = useState(false);

    const active = items.find((i) => i.id === activeId) ?? null;
    const format = FORMATS.find((f) => f.id === output.format) ?? FORMATS[0];
    const customValue = Number(customSize);
    const customError =
        customSize && (!Number.isInteger(customValue) || customValue < MIN_SIZE || customValue > MAX_SIZE)
            ? `Use a whole number from ${MIN_SIZE} to ${MAX_SIZE}`
            : "";
    const upscaled = cropSide > 0 && cropSide < output.size;

    // Release image memory when leaving the page
    const itemsRef = useRef(items);
    itemsRef.current = items;
    useEffect(() => () => itemsRef.current.forEach((i) => URL.revokeObjectURL(i.url)), []);

    const addFiles = useCallback(
        async (files: File[]) => {
            const problems: string[] = [];
            const images = files.filter((f) => {
                if (!f.type.startsWith("image/")) {
                    problems.push(`${f.name} isn’t an image.`);
                    return false;
                }
                if (f.size > MAX_FILE_BYTES) {
                    problems.push(`${f.name} is over 25 MB.`);
                    return false;
                }
                return true;
            });
            const room = MAX_FILES - itemsRef.current.length;
            if (images.length > room) problems.push(`Only ${MAX_FILES} images at a time - the rest were skipped.`);

            const loaded: Item[] = [];
            for (const file of images.slice(0, Math.max(0, room))) {
                try {
                    loaded.push(await loadImage(file));
                } catch {
                    problems.push(`${file.name} couldn’t be opened. HEIC photos from iPhone may need converting to JPEG first.`);
                }
            }
            setErrors(problems);
            if (loaded.length) {
                setItems((prev) => [...prev, ...loaded]);
                setActiveId((current) => current ?? loaded[0].id);
            }
        },
        []
    );

    // Paste an image from the clipboard anywhere on the page
    useEffect(() => {
        const onPaste = (e: ClipboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (target?.closest("input, textarea")) return;
            const files = [...(e.clipboardData?.files ?? [])].filter((f) => f.type.startsWith("image/"));
            if (files.length) {
                e.preventDefault();
                addFiles(files.map((f) => new File([f], f.name === "image.png" ? `pasted-${Date.now()}.png` : f.name, { type: f.type })));
            }
        };
        window.addEventListener("paste", onPaste);
        return () => window.removeEventListener("paste", onPaste);
    }, [addFiles]);

    const stateFor = (item: Item) => states.current.get(item.id) ?? defaultState(item);

    /** Saves the editor's current crop, so a download never uses an older one */
    const captureActive = () => {
        const live = cropperRef.current?.getState();
        if (live && activeId && readyFor.current === activeId) states.current.set(activeId, live);
    };

    const updatePreview = () => {
        const cropper = cropperRef.current;
        const state = cropper?.getState();
        if (!cropper || !state || !activeId || readyFor.current !== activeId) return;
        // Save the crop and its size right away; draw the small preview on the next frame
        states.current.set(activeId, state);
        setCropSide(Math.round(Math.min(state.coordinates?.width ?? 0, state.coordinates?.height ?? 0)));
        setEstimate("");
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const canvas = cropperRef.current?.getCanvas({ width: 240, height: 240 });
            if (canvas) setPreview(canvas.toDataURL("image/png"));
        });
    };

    const onReady = () => {
        const saved = activeId ? states.current.get(activeId) : null;
        if (saved) cropperRef.current?.setState(saved);
        readyFor.current = activeId;
        updatePreview();
    };

    const removeItem = (itemId: string) => {
        const item = items.find((i) => i.id === itemId);
        if (item) URL.revokeObjectURL(item.url);
        states.current.delete(itemId);
        const rest = items.filter((i) => i.id !== itemId);
        setItems(rest);
        if (activeId === itemId) {
            setActiveId(rest[0]?.id ?? null);
            setPreview("");
        }
    };

    const clearAll = () => {
        items.forEach((i) => URL.revokeObjectURL(i.url));
        states.current.clear();
        setItems([]);
        setActiveId(null);
        setPreview("");
        setErrors([]);
    };

    const setSize = (size: number) => {
        setOutput((o) => ({ ...o, size }));
        setCustomSize("");
        setEstimate("");
    };

    const downloadOne = async () => {
        if (!active) return;
        captureActive();
        setBusy(true);
        try {
            const blob = await render(active, stateFor(active), output);
            setEstimate(formatBytes(blob.size));
            save(blob, `${baseName(active.name)}-${output.size}.${format.ext}`);
        } catch {
            setErrors(["Couldn’t create the image. Try a smaller size or another format."]);
        } finally {
            setBusy(false);
        }
    };

    const downloadAll = async () => {
        if (!items.length) return;
        captureActive();
        setBusy(true);
        try {
            const used = new Map<string, number>();
            const files = [];
            for (const item of items) {
                const blob = await render(item, stateFor(item), output);
                let name = `${baseName(item.name)}-${output.size}`;
                const count = used.get(name) ?? 0;
                used.set(name, count + 1);
                if (count) name += `-${count + 1}`;
                files.push({ name: `${name}.${format.ext}`, blob });
            }
            save(await createZip(files), `square-images-${output.size}.zip`);
        } catch {
            setErrors(["Couldn’t create the ZIP. Try fewer images or a smaller size."]);
        } finally {
            setBusy(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        addFiles([...e.dataTransfer.files]);
    };

    const fileInput = (
        <input
            ref={fileRef}
            id={`${id}-file`}
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
                addFiles([...(e.target.files ?? [])]);
                e.target.value = "";
            }}
        />
    );

    const errorList = errors.length > 0 && (
        <ul role="alert" className="flex flex-col gap-1 rounded-xl bg-destructive/8 px-4 py-3 text-[13px] text-destructive">
            {errors.map((e) => (
                <li key={e}>{e}</li>
            ))}
        </ul>
    );

    // ─── Empty state ─────────────────────────────────────────────────────────

    if (!items.length) {
        return (
            <div className="flex flex-col gap-4 p-5 sm:p-8">
                <label
                    htmlFor={`${id}-file`}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    className={cn(
                        "flex cursor-pointer flex-col items-center gap-4 rounded-3xl border-2 border-dashed px-6 py-14 text-center transition-colors focus-within:border-brand/50 sm:py-20",
                        dragging ? "border-brand bg-[#eef1f7]" : "border-[#d9d5cc] bg-[#faf9f6] hover:border-ink/30"
                    )}
                >
                    <span className="flex size-14 items-center justify-center rounded-2xl border border-rule bg-white text-brand">
                        <ImagePlus className="size-6" aria-hidden />
                    </span>
                    <span className="flex flex-col gap-1">
                        <span className="text-lg font-semibold text-ink">Drop images here or choose files</span>
                        <span className="text-sm text-ink-muted">
                            JPG, PNG or WebP - up to {MAX_FILES} at once. You can also paste an image with ⌘V / Ctrl+V.
                        </span>
                    </span>
                    <span className={cn(primaryButton, "pointer-events-none")}>Choose images</span>
                    {fileInput}
                </label>
                {errorList}
            </div>
        );
    }

    // ─── Editor ──────────────────────────────────────────────────────────────

    const toolButton =
        "flex size-11 items-center justify-center rounded-xl border border-rule bg-white text-ink-soft transition-colors hover:border-ink/25 hover:text-ink";

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
            <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-8">
                {active && (
                    <div className="overflow-hidden rounded-2xl bg-[#1d2330]">
                        <Cropper
                            key={active.id}
                            ref={cropperRef}
                            src={active.url}
                            stencilProps={{ aspectRatio: 1 }}
                            imageRestriction={ImageRestriction.fitArea}
                            onReady={onReady}
                            onChange={updatePreview}
                            className="h-[min(62vh,520px)] min-h-72"
                        />
                    </div>
                )}

                <div className="flex flex-wrap items-center justify-center gap-2">
                    <button type="button" onClick={() => cropperRef.current?.rotateImage(-90)} aria-label="Rotate left" className={toolButton}>
                        <RotateCcw className="size-4" aria-hidden />
                    </button>
                    <button type="button" onClick={() => cropperRef.current?.rotateImage(90)} aria-label="Rotate right" className={toolButton}>
                        <RotateCw className="size-4" aria-hidden />
                    </button>
                    <button type="button" onClick={() => cropperRef.current?.flipImage(true, false)} aria-label="Flip horizontally" className={toolButton}>
                        <FlipHorizontal2 className="size-4" aria-hidden />
                    </button>
                    <button type="button" onClick={() => cropperRef.current?.flipImage(false, true)} aria-label="Flip vertically" className={toolButton}>
                        <FlipVertical2 className="size-4" aria-hidden />
                    </button>
                    <span className="mx-1 h-6 w-px bg-rule" aria-hidden />
                    <button type="button" onClick={() => cropperRef.current?.zoomImage(1.25)} aria-label="Zoom in" className={toolButton}>
                        <ZoomIn className="size-4" aria-hidden />
                    </button>
                    <button type="button" onClick={() => cropperRef.current?.zoomImage(0.8)} aria-label="Zoom out" className={toolButton}>
                        <ZoomOut className="size-4" aria-hidden />
                    </button>
                    <button
                        type="button"
                        onClick={() => {
                            if (activeId) states.current.delete(activeId);
                            cropperRef.current?.reset();
                        }}
                        className={cn(secondaryButton, "h-11 px-4 text-[13px]")}
                    >
                        <Undo2 className="size-4" aria-hidden />
                        Reset crop
                    </button>
                </div>

                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                        <Eyebrow>
                            {items.length} {items.length === 1 ? "image" : "images"}
                        </Eyebrow>
                        <button type="button" onClick={clearAll} className="text-[13px] font-semibold text-ink-muted hover:text-destructive">
                            Remove all
                        </button>
                    </div>
                    <ul className="flex gap-2 overflow-x-auto pb-1">
                        {items.map((item) => (
                            <li key={item.id} className="relative shrink-0">
                                <button
                                    type="button"
                                    onClick={() => {
                                        captureActive();
                                        setActiveId(item.id);
                                    }}
                                    aria-label={`Edit ${item.name}`}
                                    aria-current={item.id === activeId}
                                    className={cn(
                                        "block size-16 overflow-hidden rounded-xl border-2 bg-[#f4f3ef] transition-colors",
                                        item.id === activeId ? "border-brand" : "border-transparent hover:border-ink/25"
                                    )}
                                >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={item.url} alt="" className="size-full object-cover" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    aria-label={`Remove ${item.name}`}
                                    className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full border border-rule bg-white text-ink-muted shadow-sm hover:text-destructive"
                                >
                                    <X className="size-3" aria-hidden />
                                </button>
                            </li>
                        ))}
                        <li className="shrink-0">
                            <label
                                htmlFor={`${id}-file`}
                                className="flex size-16 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-[#d9d5cc] text-ink-faint transition-colors hover:border-ink/30 hover:text-ink"
                                title="Add images"
                            >
                                <Plus className="size-5" aria-hidden />
                                <span className="sr-only">Add images</span>
                            </label>
                            {fileInput}
                        </li>
                    </ul>
                    {items.length > 1 && (
                        <p className="text-[13px] text-ink-faint">Images you don’t adjust are cropped from the center.</p>
                    )}
                </div>
                {errorList}
            </div>

            {/* ── Output ── */}
            <div className="border-t border-rule bg-[#f5f7fb] lg:border-t-0 lg:border-l">
                <div className="flex flex-col gap-6 p-5 sm:p-8 lg:sticky lg:top-24">
                    <div className="flex items-center gap-4">
                        <div className="size-24 shrink-0 overflow-hidden rounded-2xl border border-[#dce1eb] bg-[repeating-conic-gradient(#eef0f4_0%_25%,#fff_0%_50%)] bg-[length:12px_12px]">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            {preview && <img src={preview} alt="Crop preview" className="size-full object-cover" />}
                        </div>
                        <div className="flex min-w-0 flex-col gap-1">
                            <Eyebrow>Preview</Eyebrow>
                            <p className="truncate text-sm font-semibold text-ink">{active?.name}</p>
                            <p className="font-mono text-xs text-ink-faint">
                                crop {cropSide} × {cropSide} px → {output.size} × {output.size} px
                            </p>
                        </div>
                    </div>

                    {upscaled && (
                        <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[13px] leading-snug text-amber-900">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                            Your crop is {cropSide} px - enlarging it to {output.size} px may look soft. Pick a smaller size or a bigger area.
                        </p>
                    )}

                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">Size</span>
                        <div role="group" aria-label="Output size" className="grid grid-cols-4 gap-2">
                            {SIZE_PRESETS.map((s) => (
                                <Chip key={s} active={!customSize && output.size === s} onClick={() => setSize(s)} className="font-mono">
                                    {s}
                                </Chip>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor={`${id}-custom`} className="text-[13px] text-ink-muted">
                                Custom
                            </label>
                            <input
                                id={`${id}-custom`}
                                inputMode="numeric"
                                value={customSize}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "");
                                    setCustomSize(value);
                                    const n = Number(value);
                                    if (Number.isInteger(n) && n >= MIN_SIZE && n <= MAX_SIZE) setOutput((o) => ({ ...o, size: n }));
                                }}
                                placeholder={String(output.size)}
                                aria-invalid={Boolean(customError) || undefined}
                                className={cn(inputClass, "h-10 w-24 text-center font-mono text-sm")}
                            />
                            <span className="text-[13px] text-ink-faint">px</span>
                        </div>
                        {customError && <p className="text-[13px] text-destructive">{customError}</p>}
                    </div>

                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">Format</span>
                        <div role="group" aria-label="Format" className="grid grid-cols-3 gap-2">
                            {FORMATS.map((f) => (
                                <Chip key={f.id} active={output.format === f.id} onClick={() => setOutput((o) => ({ ...o, format: f.id }))}>
                                    {f.label}
                                </Chip>
                            ))}
                        </div>
                        <p className="text-[13px] text-ink-faint">{format.hint}</p>
                    </div>

                    {output.format !== "image/png" && (
                        <label className="flex flex-col gap-2">
                            <span className="flex justify-between text-sm font-semibold text-ink">
                                Quality
                                <span className="font-mono font-medium text-ink-faint">{output.quality}%</span>
                            </span>
                            <input
                                type="range"
                                min={50}
                                max={100}
                                step={5}
                                value={output.quality}
                                onChange={(e) => setOutput((o) => ({ ...o, quality: Number(e.target.value) }))}
                                className="w-full accent-brand"
                            />
                        </label>
                    )}

                    <div className="flex flex-col gap-2">
                        <button type="button" onClick={downloadOne} disabled={busy || !active || Boolean(customError)} className={primaryButton}>
                            {busy ? <Loader2 className="size-4 animate-spin" aria-hidden /> : <Download className="size-4" aria-hidden />}
                            {items.length > 1 ? "Download this image" : "Download"}
                        </button>
                        {items.length > 1 && (
                            <button type="button" onClick={downloadAll} disabled={busy || Boolean(customError)} className={secondaryButton}>
                                <Download className="size-4" aria-hidden />
                                Download all {items.length} as ZIP
                            </button>
                        )}
                        <p aria-live="polite" className="min-h-5 text-center text-xs text-ink-faint">
                            {estimate && `Last file: ${estimate}`}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
