import Image from "next/image";
import type { LucideIcon } from "lucide-react";

/** Image, screenshot or custom SVG with an optional caption. Pass `src` for an image, or children for inline SVG. */
export function Figure({
    src,
    alt = "",
    width = 1200,
    height = 750,
    caption,
    children,
}: {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    caption?: string;
    children?: React.ReactNode;
}) {
    return (
        <figure className="my-8 flex flex-col gap-3">
            <div className="surface-card overflow-hidden">
                {src ? <Image src={src} alt={alt} width={width} height={height} className="h-auto w-full" /> : <div className="p-5 sm:p-8">{children}</div>}
            </div>
            {caption && <figcaption className="text-sm text-ink-muted">{caption}</figcaption>}
        </figure>
    );
}

/** Horizontal bars for 2-6 numbers. Values stay visible as text, so it reads without the bars too. */
export function BarChart({
    data,
    unit = "",
    caption,
}: {
    data: { label: string; value: number; highlight?: boolean }[];
    unit?: string;
    caption?: string;
}) {
    const max = Math.max(...data.map((d) => d.value), 1);
    return (
        <figure className="surface-card my-8 flex flex-col gap-4 p-5 sm:p-7">
            <ul className="flex flex-col gap-3.5">
                {data.map((d) => (
                    <li key={d.label} className="grid grid-cols-[minmax(0,9rem)_1fr] items-center gap-3 sm:grid-cols-[minmax(0,12rem)_1fr]">
                        <span className="truncate text-[15px] text-ink-soft">{d.label}</span>
                        <span className="flex items-center gap-2.5">
                            <span
                                aria-hidden
                                className={d.highlight ? "h-3 rounded-full bg-teal" : "h-3 rounded-full bg-brand/25"}
                                style={{ width: `${(d.value / max) * 100}%`, minWidth: 6 }}
                            />
                            <span className="shrink-0 text-[15px] font-semibold text-ink tabular-nums">
                                {d.value.toLocaleString("en-US")}
                                {unit}
                            </span>
                        </span>
                    </li>
                ))}
            </ul>
            {caption && <figcaption className="text-sm text-ink-muted">{caption}</figcaption>}
        </figure>
    );
}

/** 2-4 key numbers as tiles */
export function Stats({ items }: { items: { value: string; label: string }[] }) {
    return (
        <dl className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]">
            {items.map((s) => (
                <div key={s.label} className="surface-card flex flex-col-reverse gap-1 p-4 sm:p-5">
                    <dt className="text-sm text-ink-muted">{s.label}</dt>
                    <dd className="text-[28px] leading-none font-semibold tracking-[-0.03em] text-ink sm:text-[34px]">{s.value}</dd>
                </div>
            ))}
        </dl>
    );
}

/** A flow in order, optionally with a lucide icon per step */
export function Steps({ items }: { items: { title: string; text?: string; icon?: LucideIcon }[] }) {
    return (
        <ol className="my-8 flex flex-col gap-3">
            {items.map(({ title, text, icon: Icon }, i) => (
                <li key={title} className="surface-card flex gap-4 p-4 sm:p-5">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-bg-soft text-sm font-semibold text-teal">
                        {Icon ? <Icon className="size-4.5" aria-hidden /> : i + 1}
                    </span>
                    <span className="flex flex-col gap-0.5">
                        <span className="font-semibold text-ink">{title}</span>
                        {text && <span className="text-[15px] text-ink-muted">{text}</span>}
                    </span>
                </li>
            ))}
        </ol>
    );
}
