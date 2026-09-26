"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ArrowDown, ArrowUp, Check, Copy, ImageOff, Monitor, Pencil, Plus, Smartphone, Trash2, Undo2 } from "lucide-react";
import { Chip, Eyebrow, Field, inputClass, invalidProps, PillTabs, primaryButton, secondaryButton } from "@/app/tools/_components/tool-ui";
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
        <div className="flex flex-col gap-4 rounded-2xl border border-rule bg-[#faf9f6] p-4 sm:p-5">
            <div className="grid gap-4 sm:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                <Field label="Product name" htmlFor={`${id}-title`} error={errors.title}>
                    <input
                        id={`${id}-title`}
                        value={draft.title}
                        maxLength={LIMITS.title}
                        onChange={(e) => set("title", e.target.value)}
                        placeholder="Ceramic mug"
                        className={inputClass}
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
                        className={inputClass}
                    />
                </Field>
            </div>
            <div className="grid gap-4 sm:grid-cols-[64px_minmax(0,1fr)] sm:items-start">
                <div className="hidden size-16 items-center justify-center overflow-hidden rounded-xl border border-rule bg-white text-ink-faint sm:mt-7 sm:flex">
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
                        className={inputClass}
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
                    className={inputClass}
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
                    className={cn(inputClass, "h-auto resize-y py-3 text-sm")}
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
                            Products <span className="font-normal text-ink-faint">{products.length}</span>
                        </h2>
                        {undo ? (
                            <span className="flex items-center gap-2 text-[13px] text-ink-muted">
                                {undo.label}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setProducts(undo.snapshot);
                                        setUndo(null);
                                    }}
                                    className="inline-flex items-center gap-1 font-semibold text-brand hover:text-teal"
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
                                    className="text-[13px] font-semibold text-ink-muted hover:text-destructive"
                                >
                                    Remove all
                                </button>
                            )
                        )}
                    </div>

                    {hasExamples && (
                        <div className="flex flex-col gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900 sm:flex-row sm:items-center sm:justify-between">
                            <span>These are example products - replace them with your own before copying the code.</span>
                            <button
                                type="button"
                                onClick={() => update(products.filter((p) => !p.id.startsWith("example-")), "Removed examples")}
                                className="shrink-0 self-start font-semibold underline underline-offset-2 sm:self-auto"
                            >
                                Remove examples
                            </button>
                        </div>
                    )}

                    {products.length > 0 && (
                        <ul className="flex flex-col divide-y divide-line rounded-2xl border border-rule">
                            {products.map((p, i) =>
                                editingId === p.id ? (
                                    <li key={p.id} className="p-2">
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
                                    <li key={p.id} className="flex items-center gap-3 py-2 pr-1.5 pl-2.5">
                                        <span className="size-12 shrink-0 overflow-hidden rounded-lg border border-rule bg-[#f4f3ef]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={p.image} alt="" className="size-full object-cover" />
                                        </span>
                                        <span className="flex min-w-0 flex-1 flex-col">
                                            <span className="truncate text-sm font-semibold text-ink">{p.title}</span>
                                            <span className="truncate text-xs text-ink-faint">
                                                {[p.price, p.url].filter(Boolean).join(" · ")}
                                            </span>
                                        </span>
                                        <span className="flex shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => move(i, -1)}
                                                disabled={i === 0}
                                                aria-label={`Move ${p.title} up`}
                                                className="hidden size-9 items-center justify-center rounded-full text-ink-faint hover:bg-[#f4f3ef] hover:text-ink disabled:opacity-30 sm:flex"
                                            >
                                                <ArrowUp className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => move(i, 1)}
                                                disabled={i === products.length - 1}
                                                aria-label={`Move ${p.title} down`}
                                                className="flex size-9 items-center justify-center rounded-full text-ink-faint hover:bg-[#f4f3ef] hover:text-ink disabled:opacity-30"
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
                                                className="flex size-9 items-center justify-center rounded-full text-ink-faint hover:bg-[#f4f3ef] hover:text-ink"
                                            >
                                                <Pencil className="size-4" aria-hidden />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => update(products.filter((x) => x.id !== p.id), `Removed “${p.title}”`)}
                                                aria-label={`Remove ${p.title}`}
                                                className="flex size-9 items-center justify-center rounded-full text-ink-faint hover:bg-[#f4f3ef] hover:text-destructive"
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
                        <p className="text-[13px] text-ink-faint">That’s {MAX_PRODUCTS} products - the most that fit one grid.</p>
                    )}
                </div>

                {/* ── Options ── */}
                <div className="border-t border-rule bg-[#f5f7fb] lg:border-t-0 lg:border-l">
                    <div className="flex flex-col gap-5 p-5 sm:p-8">
                        <Eyebrow>Design</Eyebrow>
                        <div className="flex flex-col gap-2">
                            <span className="text-sm font-semibold text-ink">Layout</span>
                            <div role="group" aria-label="Layout" className="grid grid-cols-2 gap-2">
                                <Chip active={options.layout === "grid"} onClick={() => setOption("layout", "grid")}>
                                    Grid
                                </Chip>
                                <Chip active={options.layout === "carousel"} onClick={() => setOption("layout", "carousel")}>
                                    Carousel
                                </Chip>
                            </div>
                        </div>
                        {options.layout === "grid" && (
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-ink">
                                    Columns on desktop <span className="font-normal text-ink-faint">(2 on phones)</span>
                                </span>
                                <div role="group" aria-label="Columns" className="grid grid-cols-3 gap-2">
                                    {([2, 3, 4] as const).map((n) => (
                                        <Chip key={n} active={options.columns === n} onClick={() => setOption("columns", n)}>
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
                                    <Chip active={options.ratio === "square"} onClick={() => setOption("ratio", "square")}>
                                        1:1
                                    </Chip>
                                    <Chip active={options.ratio === "portrait"} onClick={() => setOption("ratio", "portrait")}>
                                        4:5
                                    </Chip>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-semibold text-ink">Corners</span>
                                <div role="group" aria-label="Corner radius" className="grid grid-cols-3 gap-1.5">
                                    {([0, 8, 16] as const).map((r) => (
                                        <Chip key={r} active={options.radius === r} onClick={() => setOption("radius", r)} className="px-1 font-mono">
                                            {r}
                                        </Chip>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor={`${id}-button`} className="text-sm font-semibold text-ink">
                                Button <span className="font-normal text-ink-faint">(leave empty for none)</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    id={`${id}-button`}
                                    value={options.button}
                                    maxLength={LIMITS.button}
                                    onChange={(e) => setOption("button", e.target.value)}
                                    className={cn(inputClass, "h-11")}
                                />
                                <label className="relative size-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-ink/12" style={{ backgroundColor: options.buttonColor }}>
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
                        <div className="flex flex-col gap-2.5 text-sm text-ink-soft">
                            {(
                                [
                                    ["showPrice", "Show price"],
                                    ["showDescription", "Show description"],
                                    ["newTab", "Open links in a new tab"],
                                ] as const
                            ).map(([key, label]) => (
                                <label key={key} className="flex items-center gap-2.5">
                                    <input type="checkbox" checked={options[key]} onChange={(e) => setOption(key, e.target.checked)} className="size-4 accent-brand" />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Preview / code ── */}
            <div className="flex flex-col gap-4 border-t border-rule p-5 sm:p-8">
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
                            <div role="group" aria-label="Preview width" className="flex rounded-full border border-rule bg-white p-0.5">
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
                                            "flex size-9 items-center justify-center rounded-full transition-colors",
                                            device === key ? "bg-brand text-white" : "text-ink-muted hover:text-ink"
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
                    <p className="rounded-2xl border border-dashed border-rule px-5 py-10 text-center text-sm text-ink-faint">
                        Add a product to see the grid.
                    </p>
                ) : view === "preview" ? (
                    <div className="rounded-2xl border border-rule bg-[#f4f3ef] p-2 sm:p-4">
                        <iframe
                            ref={frameRef}
                            title="Product grid preview"
                            srcDoc={doc}
                            // No scripts run in the preview; same-origin only lets us measure its height
                            sandbox="allow-same-origin allow-popups"
                            onLoad={measure}
                            className={cn("mx-auto block rounded-xl border-0 bg-white transition-[width]", device === "phone" ? "w-[390px] max-w-full" : "w-full")}
                            style={{ height: frameHeight }}
                        />
                    </div>
                ) : (
                    <pre className="max-h-[520px] overflow-auto rounded-2xl border border-rule bg-[#111418] p-5 font-mono text-[13px] leading-relaxed text-[#e6e3dc]">
                        <code>{html}</code>
                    </pre>
                )}
                <p className="text-[13px] text-ink-faint">
                    In Shopify: open a blog post, switch the editor to HTML with the <span className="font-mono">&lt;&gt;</span> button, and paste the code
                    where the grid should go.
                </p>
            </div>
        </div>
    );
}
