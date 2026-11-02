import { cn } from "@/lib/utils";

/** Shared form pieces for the tool pages */

/** Filled input: off-white fill, no border until focus. On an off-white surface, add `bg-white` */
export const inputClass =
    "h-12 w-full min-w-0 rounded-[14px] border-2 border-transparent bg-bg-soft px-4 text-base text-ink outline-none transition-[border-color,background-color] placeholder:text-[#5b6068]/70 focus:border-teal focus:bg-white disabled:opacity-60 aria-invalid:border-destructive";

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
                hint && <p className="text-[13px] text-[#5b6068]">{hint}</p>
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
                "flex h-11 min-w-0 items-center justify-center gap-2 rounded-[12px] px-3 text-sm font-semibold transition-colors",
                active ? "bg-brand text-white" : "bg-bg-soft text-ink hover:bg-[#ece9e2]",
                className
            )}
        >
            {children}
        </button>
    );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <p className={cn("text-sm font-semibold text-ink", className)}>{children}</p>
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
        <div role="group" aria-label={label} className="flex max-w-full gap-1 self-start overflow-x-auto rounded-[16px] bg-bg-soft p-1.5 [scrollbar-width:none]">
            {options.map((o) => (
                <button
                    key={o.id}
                    type="button"
                    aria-pressed={value === o.id}
                    onClick={() => onChange(o.id)}
                    className={cn(
                        "h-11 shrink-0 rounded-[12px] px-4 text-sm font-semibold whitespace-nowrap transition-colors",
                        value === o.id ? "bg-white text-ink shadow-[0_1px_3px_rgba(17,20,24,0.12)]" : "text-[#4a4f57] hover:text-ink"
                    )}
                >
                    {o.label}
                </button>
            ))}
        </div>
    );
}

export const primaryButton =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-teal px-5.5 text-[15px] font-semibold text-white transition-colors hover:bg-teal/90 disabled:opacity-40";

export const secondaryButton =
    "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#e9ecf3] px-5.5 text-[15px] font-semibold text-brand transition-colors hover:bg-[#dfe4ee] disabled:opacity-40";

/** Round icon-only button (add `aria-label`) */
export const iconButton =
    "inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-bg-soft text-ink transition-colors hover:bg-[#ece9e2] disabled:opacity-40";
