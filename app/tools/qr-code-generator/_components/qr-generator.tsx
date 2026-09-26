"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { AlertTriangle, Check, Copy, Download, ImageUp, Link2, RotateCcw, X } from "lucide-react";
import type QRCodeStyling from "qr-code-styling";
import type { Options } from "qr-code-styling";
import { cn } from "@/lib/utils";
import { Chip, Eyebrow, Field, inputClass, PillTabs } from "@/app/tools/_components/tool-ui";
import {
    byteLength,
    CONTENT_TYPES,
    EMPTY_FIELDS,
    encodeContent,
    MAX_BYTES_H,
    MAX_BYTES_Q,
    scanWarning,
    type ContentFields,
    type ContentType,
} from "./qr-content";

// ─── Options ──────────────────────────────────────────────────────────────────

type BodyShape = "square" | "rounded" | "dots" | "classy";
type CornerShape = "square" | "extra-rounded" | "dot";
type CornerDotShape = "square" | "dot";
type Quality = "low" | "medium" | "high";

type QrStyle = {
    body: BodyShape;
    corner: CornerShape;
    cornerDot: CornerDotShape;
    dotColor: string;
    bgColor: string;
    cornerColor: string;
    cornerDotColor: string;
    /** Quiet zone around the code, as % of the image size */
    margin: number;
    transparent: boolean;
};

const DEFAULT_STYLE: QrStyle = {
    body: "dots",
    corner: "extra-rounded",
    cornerDot: "dot",
    dotColor: "#16284d",
    bgColor: "#ffffff",
    cornerColor: "#16284d",
    cornerDotColor: "#127a6f",
    margin: 4,
    transparent: false,
};

const BODY_SHAPES: { id: BodyShape; label: string }[] = [
    { id: "square", label: "Square" },
    { id: "rounded", label: "Rounded" },
    { id: "dots", label: "Dots" },
    { id: "classy", label: "Classy" },
];

const CORNER_SHAPES: { id: CornerShape; label: string }[] = [
    { id: "square", label: "Square" },
    { id: "extra-rounded", label: "Rounded" },
    { id: "dot", label: "Round" },
];

const CORNER_DOTS: { id: CornerDotShape; label: string }[] = [
    { id: "square", label: "Square" },
    { id: "dot", label: "Dot" },
];

const QUALITIES: { id: Quality; label: string; px: number }[] = [
    { id: "low", label: "Low", px: 300 },
    { id: "medium", label: "Medium", px: 600 },
    { id: "high", label: "High", px: 1200 },
];

const PREVIEW_SIZE = 300;
const LOGO_TYPES = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

type Logo = { src: string; name: string };

function buildOptions(
    data: string,
    style: QrStyle,
    logo: Logo | null,
    logoSize: number,
    size: number,
    kind: "svg" | "canvas",
    transparent: boolean
): Partial<Options> {
    return {
        width: size,
        height: size,
        type: kind,
        data,
        margin: Math.round((style.margin / 100) * size),
        // A logo hides part of the code, so it needs the highest error correction
        qrOptions: { errorCorrectionLevel: logo ? "H" : "Q" },
        dotsOptions: { type: style.body, color: style.dotColor },
        cornersSquareOptions: { type: style.corner, color: style.cornerColor },
        cornersDotOptions: { type: style.cornerDot, color: style.cornerDotColor },
        backgroundOptions: { color: transparent ? "transparent" : style.bgColor },
        image: logo?.src,
        imageOptions: { crossOrigin: "anonymous", hideBackgroundDots: true, imageSize: logoSize, margin: 4 },
    };
}

function fileNameFrom(summary: string) {
    const slug = summary
        .toLowerCase()
        .replace(/^https?:\/\//, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 40);
    return slug ? `qr-${slug}` : "qr-code";
}

// ─── Glyphs ───────────────────────────────────────────────────────────────────

function BodyGlyph({ shape }: { shape: BodyShape }) {
    const cells = [0, 1, 2, 3].map((i) => ({ x: (i % 2) * 11 + 1, y: Math.floor(i / 2) * 11 + 1 }));
    return (
        <svg viewBox="0 0 22 22" className="size-4 shrink-0" fill="currentColor" aria-hidden>
            {cells.map(({ x, y }) => {
                const key = `${x}-${y}`;
                if (shape === "dots") return <circle key={key} cx={x + 4.5} cy={y + 4.5} r={4.5} />;
                if (shape === "rounded") return <rect key={key} x={x} y={y} width={9} height={9} rx={3} />;
                if (shape === "classy") return <path key={key} d={`M${x} ${y}h9v6l-3 3h-6z`} />;
                return <rect key={key} x={x} y={y} width={9} height={9} />;
            })}
        </svg>
    );
}

function CornerGlyph({ shape }: { shape: CornerShape }) {
    const r = shape === "dot" ? 11 : shape === "extra-rounded" ? 6 : 0;
    const inner = shape === "dot" ? 4 : shape === "extra-rounded" ? 2 : 0;
    return (
        <svg viewBox="0 0 22 22" className="size-4 shrink-0" aria-hidden>
            <rect x={1.5} y={1.5} width={19} height={19} rx={r} fill="none" stroke="currentColor" strokeWidth={3} />
            <rect x={7} y={7} width={8} height={8} rx={inner} fill="currentColor" />
        </svg>
    );
}

function CornerDotGlyph({ shape }: { shape: CornerDotShape }) {
    return (
        <svg viewBox="0 0 22 22" className="size-4 shrink-0" fill="currentColor" aria-hidden>
            {shape === "dot" ? <circle cx={11} cy={11} r={6} /> : <rect x={5} y={5} width={12} height={12} />}
        </svg>
    );
}

function ColorField({
    label,
    value,
    onChange,
    disabled,
}: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}) {
    return (
        <label
            className={cn(
                "flex min-w-0 cursor-pointer items-center gap-2.5 rounded-xl border border-rule px-2.5 py-2 transition-colors hover:border-ink/25",
                disabled && "pointer-events-none opacity-45"
            )}
        >
            <span className="relative size-8 shrink-0 overflow-hidden rounded-lg border border-ink/12" style={{ backgroundColor: value }}>
                <input
                    type="color"
                    value={value}
                    disabled={disabled}
                    onChange={(e) => onChange(e.target.value)}
                    aria-label={`${label} color`}
                    className="absolute inset-0 size-full cursor-pointer opacity-0"
                />
            </span>
            <span className="flex min-w-0 flex-col">
                <span className="truncate text-[13px] font-semibold text-ink">{label}</span>
                <span className="font-mono text-[11px] text-ink-faint uppercase">{value}</span>
            </span>
        </label>
    );
}

function Slider({
    label,
    value,
    display,
    min,
    max,
    step,
    onChange,
    disabled,
}: {
    label: string;
    value: number;
    display: string;
    min: number;
    max: number;
    step: number;
    onChange: (v: number) => void;
    disabled?: boolean;
}) {
    return (
        <label className={cn("flex flex-col gap-2", disabled && "opacity-45")}>
            <span className="flex justify-between text-sm font-semibold text-ink">
                {label}
                <span className="font-mono font-medium text-ink-faint">{display}</span>
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full accent-brand"
            />
        </label>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function QrGenerator() {
    const id = useId();
    const previewRef = useRef<HTMLDivElement>(null);
    const qrRef = useRef<QRCodeStyling | null>(null);

    const [type, setType] = useState<ContentType>("url");
    const [fields, setFields] = useState<ContentFields>(EMPTY_FIELDS);
    const [style, setStyle] = useLocalStorage<QrStyle>("nc_qr_style", DEFAULT_STYLE, { initializeWithValue: false });
    const [quality, setQuality] = useState<Quality>("medium");
    const [logo, setLogo] = useState<Logo | null>(null);
    const [logoSize, setLogoSize] = useState(0.3);
    const [logoError, setLogoError] = useState("");
    const [renderError, setRenderError] = useState("");
    const [status, setStatus] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

    const s = { ...DEFAULT_STYLE, ...style };
    const setField = <K extends keyof ContentFields>(key: K, value: ContentFields[K]) =>
        setFields((prev) => ({ ...prev, [key]: value }));
    const updateStyle = (patch: Partial<QrStyle>) => setStyle((prev) => ({ ...DEFAULT_STYLE, ...prev, ...patch }));

    const encoded = useMemo(() => encodeContent(type, fields), [type, fields]);
    const maxBytes = logo ? MAX_BYTES_H : MAX_BYTES_Q;
    const bytes = encoded.data ? byteLength(encoded.data) : 0;
    const tooLong = bytes > maxBytes;
    const ready = Boolean(encoded.data) && !tooLong && !renderError;
    const warning = scanWarning(
        { dot: s.dotColor, corner: s.cornerColor, cornerDot: s.cornerDotColor, bg: s.bgColor },
        s.transparent
    );

    const previewOptions = useMemo(
        () => buildOptions(encoded.data, s, logo, logoSize, PREVIEW_SIZE, "svg", s.transparent),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [encoded.data, JSON.stringify(s), logo, logoSize]
    );

    // Draw the preview - one instance, updated in place
    useEffect(() => {
        if (!encoded.data || tooLong) return;
        let cancelled = false;
        import("qr-code-styling").then(({ default: QRCodeStyling }) => {
            if (cancelled || !previewRef.current) return;
            try {
                if (!qrRef.current) {
                    qrRef.current = new QRCodeStyling(previewOptions);
                    previewRef.current.innerHTML = "";
                    qrRef.current.append(previewRef.current);
                } else {
                    qrRef.current.update(previewOptions);
                }
                setRenderError("");
            } catch {
                setRenderError("This content can’t be turned into a QR code. Try shortening it.");
            }
        });
        return () => {
            cancelled = true;
        };
    }, [previewOptions, encoded.data, tooLong]);

    // The preview element is removed while there is nothing to show, so start fresh next time
    useEffect(() => {
        if (!encoded.data || tooLong) qrRef.current = null;
    }, [encoded.data, tooLong]);

    const flash = (kind: "ok" | "error", text: string) => {
        setStatus({ kind, text });
        window.setTimeout(() => setStatus(null), 2500);
    };

    const makeExport = async (kind: "svg" | "canvas", transparent: boolean) => {
        const { default: QRCodeStyling } = await import("qr-code-styling");
        const px = QUALITIES.find((q) => q.id === quality)!.px;
        return new QRCodeStyling(buildOptions(encoded.data, s, logo, logoSize, px, kind, transparent));
    };

    const download = async (ext: "png" | "jpeg" | "svg") => {
        if (!ready) return;
        try {
            // JPEG has no transparency, so it always uses the background colour
            const qr = await makeExport(ext === "svg" ? "svg" : "canvas", s.transparent && ext !== "jpeg");
            await qr.download({ name: fileNameFrom(encoded.summary), extension: ext });
        } catch {
            flash("error", "Download failed. Please try again.");
        }
    };

    const copyImage = async () => {
        if (!ready) return;
        try {
            const qr = await makeExport("canvas", s.transparent);
            const blob = (await qr.getRawData("png")) as Blob | null;
            if (!blob || typeof ClipboardItem === "undefined") throw new Error("unsupported");
            await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
            flash("ok", "Image copied");
        } catch {
            flash("error", "Your browser can’t copy images - use Download instead.");
        }
    };

    const handleLogo = (file: File | undefined) => {
        setLogoError("");
        if (!file) return;
        if (!LOGO_TYPES.includes(file.type)) {
            setLogoError("Use a PNG, JPG, SVG or WebP image.");
            return;
        }
        if (file.size > LOGO_MAX_BYTES) {
            setLogoError("That image is over 2 MB - please use a smaller file.");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => setLogo({ src: String(reader.result), name: file.name });
        reader.onerror = () => setLogoError("Couldn’t read that file.");
        reader.readAsDataURL(file);
    };

    const reset = () => {
        setStyle(DEFAULT_STYLE);
        setLogo(null);
        setLogoSize(0.3);
        setLogoError("");
    };

    const fid = (name: string) => `${id}-${name}`;
    const invalid = (key: keyof ContentFields) =>
        encoded.errors[key] ? { "aria-invalid": true, "aria-describedby": `${fid(key)}-error` } : {};

    return (
        <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(360px,440px)] xl:grid-cols-[minmax(0,1fr)_480px]">
            {/* ── Content ── */}
            <div className="flex flex-col gap-5 p-5 sm:p-8 lg:col-start-1 lg:row-start-1 lg:pb-7">
                <PillTabs options={CONTENT_TYPES} value={type} onChange={setType} label="What should the code open?" />

                {type === "url" && (
                    <Field
                        label="Your link"
                        htmlFor={fid("url")}
                        error={encoded.errors.url}
                        hint="A website, menu, social profile or document. We add https:// if it’s missing."
                    >
                        <div className="relative">
                            <Link2 className="pointer-events-none absolute top-1/2 left-4 size-[18px] -translate-y-1/2 text-ink-faint" aria-hidden />
                            <input
                                id={fid("url")}
                                type="url"
                                inputMode="url"
                                autoComplete="url"
                                spellCheck={false}
                                value={fields.url}
                                onChange={(e) => setField("url", e.target.value)}
                                placeholder="example.com"
                                className={cn(inputClass, "pl-11")}
                                {...invalid("url")}
                            />
                        </div>
                    </Field>
                )}

                {type === "text" && (
                    <Field label="Your text" htmlFor={fid("text")} hint="Shown as plain text when scanned.">
                        <textarea
                            id={fid("text")}
                            value={fields.text}
                            onChange={(e) => setField("text", e.target.value)}
                            rows={4}
                            placeholder="Any message, code or note"
                            className={cn(inputClass, "h-auto resize-y py-3")}
                        />
                    </Field>
                )}

                {type === "wifi" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Network name" htmlFor={fid("wifiName")}>
                            <input
                                id={fid("wifiName")}
                                value={fields.wifiName}
                                onChange={(e) => setField("wifiName", e.target.value)}
                                placeholder="Cafe Guest"
                                autoComplete="off"
                                className={inputClass}
                            />
                        </Field>
                        <Field label="Password" htmlFor={fid("wifiPassword")} error={encoded.errors.wifiPassword}>
                            <input
                                id={fid("wifiPassword")}
                                value={fields.wifiPassword}
                                onChange={(e) => setField("wifiPassword", e.target.value)}
                                disabled={fields.wifiSecurity === "nopass"}
                                autoComplete="off"
                                spellCheck={false}
                                className={inputClass}
                                {...invalid("wifiPassword")}
                            />
                        </Field>
                        <div className="flex flex-col gap-2 sm:col-span-2">
                            <span className="text-sm font-semibold text-ink">Security</span>
                            <div role="group" aria-label="Wi-Fi security" className="grid grid-cols-3 gap-2">
                                {(
                                    [
                                        ["WPA", "WPA/WPA2"],
                                        ["WEP", "WEP"],
                                        ["nopass", "None"],
                                    ] as const
                                ).map(([value, label]) => (
                                    <Chip key={value} active={fields.wifiSecurity === value} onClick={() => setField("wifiSecurity", value)}>
                                        {label}
                                    </Chip>
                                ))}
                            </div>
                            <label className="mt-1 flex items-center gap-2 text-sm text-ink-soft">
                                <input
                                    type="checkbox"
                                    checked={fields.wifiHidden}
                                    onChange={(e) => setField("wifiHidden", e.target.checked)}
                                    className="size-4 accent-brand"
                                />
                                Hidden network
                            </label>
                        </div>
                    </div>
                )}

                {type === "email" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Email address" htmlFor={fid("email")} error={encoded.errors.email}>
                            <input
                                id={fid("email")}
                                type="email"
                                inputMode="email"
                                value={fields.email}
                                onChange={(e) => setField("email", e.target.value)}
                                placeholder="hello@example.com"
                                className={inputClass}
                                {...invalid("email")}
                            />
                        </Field>
                        <Field label="Subject (optional)" htmlFor={fid("emailSubject")}>
                            <input
                                id={fid("emailSubject")}
                                value={fields.emailSubject}
                                onChange={(e) => setField("emailSubject", e.target.value)}
                                className={inputClass}
                            />
                        </Field>
                        <div className="sm:col-span-2">
                            <Field label="Message (optional)" htmlFor={fid("emailBody")}>
                                <textarea
                                    id={fid("emailBody")}
                                    value={fields.emailBody}
                                    onChange={(e) => setField("emailBody", e.target.value)}
                                    rows={3}
                                    className={cn(inputClass, "h-auto resize-y py-3")}
                                />
                            </Field>
                        </div>
                    </div>
                )}

                {type === "phone" && (
                    <Field
                        label="Phone number"
                        htmlFor={fid("phone")}
                        error={encoded.errors.phone}
                        hint="Include the country code, e.g. +43 690 1234567."
                    >
                        <input
                            id={fid("phone")}
                            type="tel"
                            inputMode="tel"
                            value={fields.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            placeholder="+43 690 1234567"
                            className={inputClass}
                            {...invalid("phone")}
                        />
                    </Field>
                )}

                {type === "contact" && (
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name" htmlFor={fid("firstName")}>
                            <input id={fid("firstName")} value={fields.firstName} onChange={(e) => setField("firstName", e.target.value)} autoComplete="given-name" className={inputClass} />
                        </Field>
                        <Field label="Last name" htmlFor={fid("lastName")}>
                            <input id={fid("lastName")} value={fields.lastName} onChange={(e) => setField("lastName", e.target.value)} autoComplete="family-name" className={inputClass} />
                        </Field>
                        <Field label="Phone" htmlFor={fid("contactPhone")} error={encoded.errors.contactPhone}>
                            <input id={fid("contactPhone")} type="tel" inputMode="tel" value={fields.contactPhone} onChange={(e) => setField("contactPhone", e.target.value)} autoComplete="tel" className={inputClass} {...invalid("contactPhone")} />
                        </Field>
                        <Field label="Email" htmlFor={fid("contactEmail")} error={encoded.errors.contactEmail}>
                            <input id={fid("contactEmail")} type="email" inputMode="email" value={fields.contactEmail} onChange={(e) => setField("contactEmail", e.target.value)} autoComplete="email" className={inputClass} {...invalid("contactEmail")} />
                        </Field>
                        <Field label="Company (optional)" htmlFor={fid("company")}>
                            <input id={fid("company")} value={fields.company} onChange={(e) => setField("company", e.target.value)} autoComplete="organization" className={inputClass} />
                        </Field>
                        <Field label="Website (optional)" htmlFor={fid("website")} error={encoded.errors.website}>
                            <input id={fid("website")} inputMode="url" value={fields.website} onChange={(e) => setField("website", e.target.value)} autoComplete="url" className={inputClass} {...invalid("website")} />
                        </Field>
                    </div>
                )}

                {tooLong && (
                    <p role="alert" className="rounded-xl bg-destructive/8 px-4 py-3 text-[13px] text-destructive">
                        Too much content for one QR code ({bytes.toLocaleString()} of {maxBytes.toLocaleString()} bytes
                        {logo ? " with a logo" : ""}). Shorten it{logo ? " or remove the logo" : ""}.
                    </p>
                )}
            </div>

            {/* ── Preview + download ── */}
            <div className="border-y border-rule bg-[#f5f7fb] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:border-y-0 lg:border-l">
                <div className="flex flex-col gap-5 p-5 sm:p-8 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between">
                        <Eyebrow>Live preview</Eyebrow>
                        <button
                            type="button"
                            onClick={reset}
                            className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[#dce1eb] bg-white px-3 text-xs font-semibold text-ink-soft transition-colors hover:text-ink"
                        >
                            <RotateCcw className="size-[13px]" aria-hidden />
                            Reset style
                        </button>
                    </div>

                    <div
                        className={cn(
                            "mx-auto flex aspect-square w-full max-w-[340px] items-center justify-center rounded-3xl border border-[#dce1eb] p-5",
                            s.transparent
                                ? "bg-[repeating-conic-gradient(#eef0f4_0%_25%,#fff_0%_50%)] bg-[length:16px_16px]"
                                : "bg-white shadow-[0_12px_32px_-18px_rgba(22,40,77,0.35)]"
                        )}
                    >
                        {encoded.data && !tooLong ? (
                            <div
                                ref={previewRef}
                                role="img"
                                aria-label={`QR code for ${encoded.summary}`}
                                className="aspect-square w-full [&>canvas]:size-full [&>svg]:size-full"
                            />
                        ) : (
                            <p className="px-6 text-center text-sm text-ink-faint">
                                {tooLong ? "Too much content to fit in a QR code." : "Fill in the details to see your QR code."}
                            </p>
                        )}
                    </div>

                    {encoded.summary && !tooLong && (
                        <p className="truncate text-center font-mono text-xs text-ink-faint">{encoded.summary}</p>
                    )}

                    {renderError && <p role="alert" className="text-center text-[13px] text-destructive">{renderError}</p>}

                    {warning && ready && (
                        <p className="flex gap-2 rounded-xl border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[13px] leading-snug text-amber-900">
                            <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden />
                            {warning}
                        </p>
                    )}

                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">Download quality</span>
                        <div role="group" aria-label="Download quality" className="grid grid-cols-3 gap-1 rounded-[14px] bg-[#e9edf4] p-1">
                            {QUALITIES.map((q) => (
                                <button
                                    key={q.id}
                                    type="button"
                                    aria-pressed={quality === q.id}
                                    onClick={() => setQuality(q.id)}
                                    className={cn(
                                        "flex h-12 flex-col items-center justify-center rounded-[10px] text-[13px] font-semibold transition-colors",
                                        quality === q.id ? "bg-white text-ink shadow-[0_1px_2px_rgba(17,20,24,0.08)]" : "text-ink-muted hover:text-ink"
                                    )}
                                >
                                    {q.label}
                                    <span className="font-mono text-[10px] font-medium opacity-70">{q.px} px</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2">
                        <button
                            type="button"
                            onClick={() => download("png")}
                            disabled={!ready}
                            className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-40"
                        >
                            <Download className="size-4" aria-hidden />
                            PNG
                        </button>
                        {(["jpeg", "svg"] as const).map((ext) => (
                            <button
                                key={ext}
                                type="button"
                                onClick={() => download(ext)}
                                disabled={!ready}
                                className="h-12 rounded-full border border-[#dce1eb] bg-white text-sm font-semibold text-ink uppercase transition-colors hover:border-ink/25 disabled:opacity-40"
                            >
                                {ext === "jpeg" ? "JPEG" : "SVG"}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={copyImage}
                        disabled={!ready}
                        className="inline-flex h-10 items-center justify-center gap-2 self-center rounded-full px-4 text-[13px] font-semibold text-brand transition-colors hover:bg-white disabled:opacity-40"
                    >
                        {status?.kind === "ok" ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                        {status?.kind === "ok" ? status.text : "Copy image"}
                    </button>

                    <p aria-live="polite" className={cn("text-center text-xs leading-normal", status?.kind === "error" ? "text-destructive" : "text-ink-faint")}>
                        {status?.kind === "error"
                            ? status.text
                            : s.transparent
                              ? "PNG and SVG keep the transparent background. JPEG uses your background colour."
                              : "SVG stays sharp at any size - best for print."}
                    </p>
                </div>
            </div>

            {/* ── Style ── */}
            <div className="flex flex-col gap-7 border-line p-5 sm:p-8 lg:col-start-1 lg:row-start-2 lg:border-t lg:pt-7">
                <section className="flex flex-col gap-4">
                    <Eyebrow>Style</Eyebrow>
                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">Body shape</span>
                        <div role="group" aria-label="Body shape" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {BODY_SHAPES.map((o) => (
                                <Chip key={o.id} active={s.body === o.id} onClick={() => updateStyle({ body: o.id })}>
                                    <BodyGlyph shape={o.id} />
                                    {o.label}
                                </Chip>
                            ))}
                        </div>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-[1.5fr_1fr]">
                        <div className="flex flex-col gap-2.5">
                            <span className="text-sm font-semibold text-ink">Corner shape</span>
                            <div role="group" aria-label="Corner shape" className="grid grid-cols-3 gap-2">
                                {CORNER_SHAPES.map((o) => (
                                    <Chip key={o.id} active={s.corner === o.id} onClick={() => updateStyle({ corner: o.id })}>
                                        <CornerGlyph shape={o.id} />
                                        {o.label}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <span className="text-sm font-semibold text-ink">Corner dot</span>
                            <div role="group" aria-label="Corner dot" className="grid grid-cols-2 gap-2">
                                {CORNER_DOTS.map((o) => (
                                    <Chip key={o.id} active={s.cornerDot === o.id} onClick={() => updateStyle({ cornerDot: o.id })}>
                                        <CornerDotGlyph shape={o.id} />
                                        {o.label}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <div className="h-px bg-line" />

                <section className="flex flex-col gap-3.5">
                    <Eyebrow>Colors</Eyebrow>
                    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                        <ColorField label="Dots" value={s.dotColor} onChange={(v) => updateStyle({ dotColor: v })} />
                        <ColorField
                            label="Background"
                            value={s.bgColor}
                            onChange={(v) => updateStyle({ bgColor: v })}
                            disabled={s.transparent}
                        />
                        <ColorField label="Corner" value={s.cornerColor} onChange={(v) => updateStyle({ cornerColor: v })} />
                        <ColorField label="Corner dot" value={s.cornerDotColor} onChange={(v) => updateStyle({ cornerDotColor: v })} />
                    </div>
                    <label className="flex items-center gap-2 text-sm text-ink-soft">
                        <input
                            type="checkbox"
                            checked={s.transparent}
                            onChange={(e) => updateStyle({ transparent: e.target.checked })}
                            className="size-4 accent-brand"
                        />
                        Transparent background (PNG and SVG)
                    </label>
                </section>

                <div className="h-px bg-line" />

                <section className="grid gap-5 sm:grid-cols-[1.4fr_1fr]">
                    <div className="flex flex-col gap-2.5">
                        <span className="text-sm font-semibold text-ink">
                            Center logo <span className="font-normal text-ink-faint">(optional)</span>
                        </span>
                        {logo ? (
                            <div className="flex items-center gap-3.5 rounded-[14px] border border-rule bg-[#faf9f6] px-4 py-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={logo.src} alt="" className="size-10 shrink-0 rounded-[10px] border border-rule bg-white object-contain p-1" />
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{logo.name}</span>
                                <button
                                    type="button"
                                    onClick={() => setLogo(null)}
                                    aria-label="Remove logo"
                                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink-muted transition-colors hover:bg-white hover:text-destructive"
                                >
                                    <X className="size-4" aria-hidden />
                                </button>
                            </div>
                        ) : (
                            <label
                                className="relative flex cursor-pointer items-center gap-3.5 rounded-[14px] border-[1.5px] border-dashed border-[#d9d5cc] bg-[#faf9f6] px-4 py-3.5 transition-colors focus-within:border-brand/50 hover:border-ink/30"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleLogo(e.dataTransfer.files[0]);
                                }}
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-[10px] border border-rule bg-white text-brand">
                                    <ImageUp className="size-[18px]" aria-hidden />
                                </span>
                                <span className="flex flex-col gap-0.5">
                                    <span className="text-sm font-semibold text-ink">Upload an image</span>
                                    <span className="text-xs text-ink-faint">PNG, JPG, SVG or WebP, up to 2 MB</span>
                                </span>
                                <input
                                    type="file"
                                    accept={LOGO_TYPES.join(",")}
                                    onChange={(e) => {
                                        handleLogo(e.target.files?.[0]);
                                        e.target.value = "";
                                    }}
                                    className="absolute size-px opacity-0"
                                />
                            </label>
                        )}
                        {logoError && <p role="alert" className="text-[13px] text-destructive">{logoError}</p>}
                    </div>
                    <div className="flex flex-col gap-4.5">
                        <Slider
                            label="Logo size"
                            value={Math.round(logoSize * 100)}
                            display={`${Math.round(logoSize * 100)}%`}
                            min={10}
                            max={40}
                            step={5}
                            onChange={(v) => setLogoSize(v / 100)}
                            disabled={!logo}
                        />
                        <Slider
                            label="Margin"
                            value={s.margin}
                            display={`${s.margin}%`}
                            min={0}
                            max={15}
                            step={1}
                            onChange={(v) => updateStyle({ margin: v })}
                        />
                    </div>
                </section>
            </div>
        </div>
    );
}
