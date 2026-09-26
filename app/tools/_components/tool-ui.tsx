import { cn } from "@/lib/utils";

/** Shared form pieces for the tool pages */

export const inputClass =
    "h-12 w-full min-w-0 rounded-[14px] border border-[#d9d5cc] bg-white px-4 text-base text-ink outline-none transition-[border-color,box-shadow] placeholder:text-ink-faint/70 focus:border-brand/40 focus:ring-4 focus:ring-brand/8 disabled:bg-[#faf9f6] disabled:text-ink-faint aria-invalid:border-destructive aria-invalid:ring-destructive/10";

export function Field({
    label,
    error,
    hint,
    children,
    htmlFor,
    className,
}: {
    label: React.ReactNode;
    error?: string;
    hint?: string;
    children: React.ReactNode;
    htmlFor: string;
    className?: string;
}) {
    return (
        <div className={cn("flex min-w-0 flex-col gap-2", className)}>
            <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
                {label}
            </label>
            {children}
            {error ? (
                <p id={`${htmlFor}-error`} className="text-[13px] text-destructive">
                    {error}
                </p>
            ) : (
                hint && <p className="text-[13px] text-ink-faint">{hint}</p>
            )}
        </div>
    );
}

/** aria props for an input with an error from <Field> */
export function invalidProps(id: string, error?: string) {
    return error ? { "aria-invalid": true as const, "aria-describedby": `${id}-error` } : {};
}

export function Chip({
    active,
    onClick,
    children,
    className,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <button
            type="button"
            aria-pressed={active}
            onClick={onClick}
            className={cn(
                "flex h-11 min-w-0 items-center justify-center gap-2 rounded-xl border px-2.5 text-[13px] font-semibold transition-colors",
                active ? "border-brand bg-[#eef1f7] text-brand" : "border-rule bg-white text-ink-soft hover:border-ink/25 hover:text-ink",
                className
            )}
        >
            {children}
        </button>
    );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("font-mono text-[11px] font-semibold tracking-[0.14em] text-ink-faint uppercase", className)}>{children}</p>
    );
}

/** Pill row for switching modes or content types */
export function PillTabs<T extends string>({
    options,
    value,
    onChange,
    label,
}: {
    options: { id: T; label: string }[];
    value: T;
    onChange: (id: T) => void;
    label: string;
}) {
    return (
        <div role="group" aria-label={label} className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 [scrollbar-width:none]">
            {options.map((o) => (
                <button
                    key={o.id}
                    type="button"
                    aria-pressed={value === o.id}
                    onClick={() => onChange(o.id)}
                    className={cn(
                        "h-10 shrink-0 rounded-full border px-4 text-[13px] font-semibold whitespace-nowrap transition-colors",
                        value === o.id ? "border-brand bg-brand text-white" : "border-rule bg-white text-ink-soft hover:border-ink/25 hover:text-ink"
                    )}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}

export const primaryButton =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-colors hover:bg-brand/90 disabled:opacity-40";

export const secondaryButton =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[#dce1eb] bg-white px-5 text-sm font-semibold text-ink transition-colors hover:border-ink/25 disabled:opacity-40";
