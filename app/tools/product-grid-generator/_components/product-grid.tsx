"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ArrowDown, ArrowUp, Check, Copy, ImageOff, Monitor, Pencil, Plus, Smartphone, Trash2, Undo2 } from "lucide-react";
import { Chip, Eyebrow, Field, iconButton, inputClass, invalidProps, PillTabs, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
import { cn } from "@/lib/utils";
import {
    buildHtml,
    DEFAULT_OPTIONS,
    EXAMPLE_PRODUCTS,
    isWebUrl,
    LIMITS,
    previewDocument,
    uid,
    validateProduct,
    type GridOptions,
    type Product,
} from "./grid-html";

type Draft = Omit<Product, "id">;
const EMPTY_DRAFT: Draft = { title: "", image: "", url: "", price: "", description: "" };
const MAX_PRODUCTS = 24;
/** Chips on the off-white sidebar fill white when not selected */
const onSoft = (active: boolean) => !active && "bg-white hover:bg-[#e9ecf3]";
const rowButton = cn(iconButton, "bg-transparent text-[#4a4f57] hover:bg-white hover:text-ink");

// ─── Product form ─────────────────────────────────────────────────────────────

function ProductForm({
    initial,
    submitLabel,
    onSave,
    onCancel,
}: {
    initial: Draft;
    submitLabel: string;
    onSave: (d: Draft) => void;
    onCancel?: () => void;
}) {
    const id = useId();
    const [draft, setDraft] = useState(initial);
    const [submitted, setSubmitted] = useState(false);
    const [imageBroken, setImageBroken] = useState(false);
    const errors = submitted ? validateProduct(draft) : {};
    const set = (key: keyof Draft, value: string) => setDraft((d) => ({ ...d, [key]: value }));

    const save = () => {
        setSubmitted(true);
        if (Object.keys(validateProduct(draft)).length) return;
        onSave(draft);
        setDraft(EMPTY_DRAFT);
        setSubmitted(false);
    };

    const imageOk = isWebUrl(draft.image.trim());

    return (
        <div className="flex flex-col gap-4 rounded-[20px] bg-bg-soft p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <Field label="Product name" htmlFor={`${id}-title`} error={errors.title}>
                    <input
                        id={`${id}-title`}
                        value={draft.title}
                        maxLength={LIMITS.title}
                        onChange={(e) => set("title", e.target.value)}
                        placeholder="Ceramic mug"
                        className={cn(inputClass, "bg-white")}
                        {...invalidProps(`${id}-title`, errors.title)}
                    />
                </Field>
                <Field label="Price (optional)" htmlFor={`${id}-price`}>
                    <input
                        id={`${id}-price`}
                        value={draft.price}
                        maxLength={LIMITS.price}
                        onChange={(e) => set("price", e.target.value)}
                        placeholder="€24.00"
                        className={cn(inputClass, "bg-white")}
                    />
                </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-start">
                <div className="hidden size-16 items-center justify-center overflow-hidden rounded-[14px] bg-white text-[#5b6068] sm:mt-7 sm:flex">
                    {imageOk && !imageBroken ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={draft.image.trim()} alt="" className="size-full object-cover" onError={() => setImageBroken(true)} />
                    ) : (
                        <ImageOff className="size-5" aria-hidden />
                    )}
                </div>
                <Field
                    label="Image link"
                    htmlFor={`${id}-image`}
                    error={errors.image}
                    hint={imageOk && imageBroken ? "This image didn’t load - check the link is public." : "Right-click a product image in your store and copy its address."}
                >
                    <input
                        id={`${id}-image`}
                        inputMode="url"
                        spellCheck={false}
                        value={draft.image}
                        maxLength={LIMITS.url}
                        onChange={(e) => {
                            set("image", e.target.value);
                            setImageBroken(false);
                        }}
                        placeholder="https://cdn.shopify.com/…/mug.jpg"
                        className={cn(inputClass, "bg-white")}
                        {...invalidProps(`${id}-image`, errors.image)}
                    />
                </Field>
            </div>
            <Field label="Product link" htmlFor={`${id}-url`} error={errors.url} hint="A full link, or a path in your shop like /products/mug.">
                <input
                    id={`${id}-url`}
                    inputMode="url"
                    spellCheck={false}
                    value={draft.url}
                    maxLength={LIMITS.url}
                    onChange={(e) => set("url", e.target.value)}
                    placeholder="/products/ceramic-mug"
                    className={cn(inputClass, "bg-white")}
                    {...invalidProps(`${id}-url`, errors.url)}
                />
            </Field>
            <Field label="Short description (optional)" htmlFor={`${id}-desc`}>
                <textarea
                    id={`${id}-desc`}
                    value={draft.description}
                    maxLength={LIMITS.description}
                    onChange={(e) => set("description", e.target.value)}
                    rows={2}
                    className={cn(inputClass, "h-auto resize-y bg-white py-3 text-sm")}
                />
            </Field>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                {onCancel && (
                    <button type="button" onClick={onCancel} className={cn(secondaryButton, "h-11")}>
                        Cancel
                    </button>
                )}
                <button type="button" onClick={save} className={cn(primaryButton, "h-11")}>
                    <Check className="size-4" aria-hidden />
                    {submitLabel}
                </button>
            </div>
        </div>
    );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ProductGrid() {
    const id = useId();
    const [products, setProducts] = useLocalStorage<Product[]>("nc_grid_products", EXAMPLE_PRODUCTS, { initializeWithValue: false });
    const [stored, setOptions] = useLocalStorage<GridOptions>("nc_grid_options", DEFAULT_OPTIONS, { initializeWithValue: false });
    const options = { ...DEFAULT_OPTIONS, ...stored };
    const setOption = <K extends keyof GridOptions>(key: K, value: GridOptions[K]) =>
        setOptions((prev) => ({ ...DEFAULT_OPTIONS, ...prev, [key]: value }));

    const [editingId, setEditingId] = useState<string | null>(null);
    const [adding, setAdding] = useState(false);
    const [undo, setUndo] = useState<{ label: string; snapshot: Product[] } | null>(null);
    const [view, setView] = useState<"preview" | "code">("preview");
    const [device, setDevice] = useState<"desktop" | "phone">("desktop");
    const [copied, setCopied] = useState(false);
    const [frameHeight, setFrameHeight] = useState(420);
    const frameRef = useRef<HTMLIFrameElement>(null);

    const hasExamples = products.some((p) => p.id.startsWith("example-"));
    const html = useMemo(() => buildHtml(products, options), [products, options]);
    const doc = useMemo(() => previewDocument(html), [html]);

    // Size the preview frame to its content (images load after the first paint)
    const measure = () => {
        const body = frameRef.current?.contentDocument?.body;
        if (body) setFrameHeight(Math.max(240, body.scrollHeight + 8));
    };
    useEffect(() => {
        const timers = [300, 900, 2000].map((ms) => window.setTimeout(measure, ms));
        return () => timers.forEach(clearTimeout);
    }, [doc, device, view]);

    const update = (next: Product[], undoLabel?: string) => {
        if (undoLabel) setUndo({ label: undoLabel, snapshot: products });
        setProducts(next);
    };

    const move = (index: number, delta: number) => {
        const to = index + delta;
        if (to < 0 || to >= products.length) return;
        const next = [...products];
        const [item] = next.splice(index, 1);
        next.splice(to, 0, item);
        setProducts(next);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(html);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1600);
        } catch {
            setView("code");
        }
    };

    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)]">
                {/* ── Products ── */}
                <div className="flex min-w-0 flex-col gap-4 p-5 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">
                            Products <span className="font-normal text-[#5b6068] tabular-nums">{products.length}</span>
                        </h2>
                        {undo ? (
                            <span className="flex items-center gap-2 text-[13px] text-[#5b6068]">
                                {undo.label}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProducts(undo.snapshot);
                                        setUndo(null);
                                    }}
                                    className="inline-flex min-h-11 items-center gap-1 font-semibold text-brand hover:text-teal"
                                >
                                    <Undo2 className="size-3.5" aria-hidden />
                                    Undo
                                </button>
                            </span>
                        ) : (
                            products.length > 0 && (
                                <button
                                    type="button"
                                    onClick={() => update([], `Removed ${products.length} products`)}
                                    className="inline-flex min-h-11 items-center text-[13px] font-semibold text-[#5b6068] hover:text-destructive"
                                >
                                    Remove all
                                </button>
                            )
                        )}
                    </div>

                    {hasExamples && (
                        <div className="flex flex-col gap-2 rounded-[14px] bg-[#f3e7ec] px-4 py-3 text-[13px] text-ink sm:flex-row sm:items-center sm:justify-between">
                            <span>These are example products - replace them with your own before copying the code.</span>
                            <button
                                type="button"
                                onClick={() => update(products.filter((p) => !p.id.startsWith("example-")), "Removed examples")}
                                className="inline-flex min-h-11 shrink-0 items-center self-start font-semibold underline underline-offset-2 sm:self-auto"
                            >
                                Remove examples
                            </button>
                        </div>
                    )}

                    {products.length > 0 && (
                        <ul className="flex flex-col gap-1.5">
                            {products.map((p, i) =>
                                editingId === p.id ? (
                                    <li key={p.id}>
                                        <ProductForm
                                            initial={p}
                                            submitLabel="Save product"
                                            onSave={(d) => {
                                                setProducts(products.map((x) => (x.id === p.id ? { ...d, id: x.id.replace("example-", "edited-") } : x)));
                                                setEditingId(null);
                                            }}
                                            onCancel={() => setEditingId(null)}
                                        />
                                    </li>
                                ) : (
                                    <li key={p.id} className="flex items-center gap-3 rounded-[14px] bg-bg-soft py-2 pr-1.5 pl-2">
                                        <span className="size-12 shrink-0 overflow-hidden rounded-[10px] bg-white">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.image} alt="" className="size-full object-cover" />
                                        </span>
                                        <span className="flex min-w-0 flex-1 flex-col">
                                            <span className="truncate text-sm font-semibold text-ink">{p.title}</span>
                                            <span className="truncate text-[13px] text-[#5b6068]">
                                                {[p.price, p.url].filter(Boolean).join(" · ")}
                                            </span>
                                        </span>
                                        <span className="flex shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => move(i, -1)}
                                                disabled={i === 0}
                                                aria-label={`Move ${p.title} up`}
                                                className={cn(rowButton, "hidden sm:inline-flex")}
                                            >
                                                <ArrowUp className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => move(i, 1)}
                                                disabled={i === products.length - 1}
                                                aria-label={`Move ${p.title} down`}
                                                className={rowButton}
                                            >
                                                <ArrowDown className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setEditingId(p.id);
                                                    setAdding(false);
                                                }}
                                                aria-label={`Edit ${p.title}`}
                                                className={rowButton}
                                            >
                                                <Pencil className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => update(products.filter((x) => x.id !== p.id), `Removed “${p.title}”`)}
                                                aria-label={`Remove ${p.title}`}
                                                className={cn(rowButton, "hover:text-destructive")}
                                            >
                                                <Trash2 className="size-4" aria-hidden />
                                            </button>
                                        </span>
                                    </li>
                                )
                            )}
                        </ul>
                    )}

                    {adding ? (
                        <ProductForm
                            initial={EMPTY_DRAFT}
                            submitLabel="Add product"
                            onSave={(d) => {
                                setProducts([...products, { ...d, id: uid() }]);
                                if (products.length + 1 >= MAX_PRODUCTS) setAdding(false);
                            }}
                            onCancel={() => setAdding(false)}
                        />
                    ) : products.length < MAX_PRODUCTS ? (
                        <button
                            type="button"
                            onClick={() => {
                                setAdding(true);
                                setEditingId(null);
                            }}
                            className={cn(secondaryButton, "self-start")}
                        >
                            <Plus className="size-4" aria-hidden />
                            Add product
                        </button>
                    ) : (
                        <p className="text-[13px] text-[#5b6068]">That’s {MAX_PRODUCTS} products - the most that fit one grid.</p>
                    )}
                </div>

                {/* ── Options ── */}
                <div className="px-5 pb-5 sm:px-8 sm:pb-8 lg:pt-8 lg:pl-0">
                    <div className="flex flex-col gap-5 rounded-[20px] bg-bg-soft p-4 sm:p-5">
                        <Eyebrow>Design</Eyebrow>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-ink">Layout</span>
                            <div role="group" aria-label="Layout" className="grid grid-cols-2 gap-2">
                                <Chip active={options.layout === "grid"} onClick={() => setOption("layout", "grid")} className={cn(onSoft(options.layout === "grid"))}>
                                    Grid
                                </Chip>
                                <Chip active={options.layout === "carousel"} onClick={() => setOption("layout", "carousel")} className={cn(onSoft(options.layout === "carousel"))}>
                                    Carousel
                                </Chip>
                            </div>
                        </div>
                        {options.layout === "grid" && (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-ink">
                                    Columns on desktop <span className="font-normal text-[#5b6068]">(2 on phones)</span>
                                </span>
                                <div role="group" aria-label="Columns" className="grid grid-cols-3 gap-2">
                                    {([2, 3, 4] as const).map((n) => (
                                        <Chip key={n} active={options.columns === n} onClick={() => setOption("columns", n)} className={cn("tabular-nums", onSoft(options.columns === n))}>
                                            {n}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-ink">Image</span>
                                <div role="group" aria-label="Image shape" className="grid grid-cols-2 gap-1.5">
                                    <Chip active={options.ratio === "square"} onClick={() => setOption("ratio", "square")} className={cn("tabular-nums", onSoft(options.ratio === "square"))}>
                                        1:1
                                    </Chip>
                                    <Chip active={options.ratio === "portrait"} onClick={() => setOption("ratio", "portrait")} className={cn("tabular-nums", onSoft(options.ratio === "portrait"))}>
                                        4:5
                                    </Chip>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-ink">Corners</span>
                                <div role="group" aria-label="Corner radius" className="grid grid-cols-3 gap-1.5">
                                    {([0, 8, 16] as const).map((r) => (
                                        <Chip key={r} active={options.radius === r} onClick={() => setOption("radius", r)} className={cn("px-1 tabular-nums", onSoft(options.radius === r))}>
                                            {r}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor={`${id}-button`} className="text-sm font-semibold text-ink">
                                Button <span className="font-normal text-[#5b6068]">(leave empty for none)</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id={`${id}-button`}
                                    value={options.button}
                                    maxLength={LIMITS.button}
                                    onChange={(e) => setOption("button", e.target.value)}
                                    className={cn(inputClass, "h-11 bg-white")}
                                />
                                <label className="relative size-11 shrink-0 cursor-pointer overflow-hidden rounded-full focus-within:ring-2 focus-within:ring-teal focus-within:ring-offset-2 focus-within:ring-offset-bg-soft" style={{ backgroundColor: options.buttonColor }}>
                                    <span className="sr-only">Button color</span>
                                    <input
                                        type="color"
                                        value={options.buttonColor}
                                        onChange={(e) => setOption("buttonColor", e.target.value)}
                                        className="absolute inset-0 size-full cursor-pointer opacity-0"
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="flex flex-col text-sm text-[#4a4f57]">
                            {(
                                [
                                    ["showPrice", "Show price"],
                                    ["showDescription", "Show description"],
                                    ["newTab", "Open links in a new tab"],
                                ] as const
                            ).map(([key, label]) => (
                                <label key={key} className="flex min-h-11 cursor-pointer items-center gap-3">
                                    <input type="checkbox" checked={options[key]} onChange={(e) => setOption(key, e.target.checked)} className="size-5 accent-brand" />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Preview / code ── */}
            <div className="flex flex-col gap-4 px-5 pb-5 sm:px-8 sm:pb-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <PillTabs
                        label="Show"
                        value={view}
                        onChange={setView}
                        options={[
                            { id: "preview", label: "Preview" },
                            { id: "code", label: "HTML code" },
                        ]}
                    />
                    <div className="flex items-center gap-2">
                        {view === "preview" && (
                            <div role="group" aria-label="Preview width" className="flex gap-1 rounded-[16px] bg-bg-soft p-1.5">
                                {(
                                    [
                                        ["desktop", Monitor, "Desktop width"],
                                        ["phone", Smartphone, "Phone width"],
                                    ] as const
                                ).map(([key, Icon, label]) => (
                                    <button
                                        key={key}
                                        type="button"
                                        aria-label={label}
                                        aria-pressed={device === key}
                                        onClick={() => setDevice(key)}
                                        className={cn(
                                            "flex size-11 items-center justify-center rounded-[12px] transition-colors",
                                            device === key ? "bg-white text-ink shadow-[0_1px_3px_rgba(17,20,24,0.12)]" : "text-[#4a4f57] hover:text-ink"
                                        )}
                                    >
                                        <Icon className="size-4" aria-hidden />
                                    </button>
                                ))}
                            </div>
                        )}
                        <button type="button" onClick={copy} disabled={!html} className={cn(primaryButton, "h-11 px-5")}>
                            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
                            {copied ? "Copied" : "Copy code"}
                        </button>
                    </div>
                </div>

                {!html ? (
                    <p className="rounded-[24px] bg-[#e9ecf3] px-5 py-10 text-center text-sm text-[#4a4f57]">
                        Add a product to see the grid.
                    </p>
                ) : view === "preview" ? (
                    <div className="rounded-[24px] bg-[#e9ecf3] p-2 sm:p-4">
                        <iframe
                            ref={frameRef}
                            title="Product grid preview"
                            srcDoc={doc}
                            // No scripts run in the preview; same-origin only lets us measure its height
                            sandbox="allow-same-origin allow-popups"
                            onLoad={measure}
                            className={cn("mx-auto block rounded-[14px] border-0 bg-white transition-[width]", device === "phone" ? "w-[390px] max-w-full" : "w-full")}
                            style={{ height: frameHeight }}
                        />
                    </div>
                ) : (
                    <pre className="max-h-[520px] overflow-auto rounded-[24px] bg-[#111418] p-5 font-mono text-[13px] leading-relaxed text-[#e6e3dc]">
                        <code>{html}</code>
                    </pre>
                )}
                <p className="text-[13px] text-[#5b6068]">
                    In Shopify: open a blog post, switch the editor to HTML with the <span className="font-semibold text-ink">&lt;&gt;</span> button, and paste the code
                    where the grid should go.
                </p>
            </div>
        </div>
    );
}
