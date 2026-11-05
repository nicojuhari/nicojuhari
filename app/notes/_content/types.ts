import type { ReactNode } from "react";

export type NoteTag = "code" | "finance" | "ai" | "tools" | "business";

export const noteTagLabel: Record<NoteTag, string> = {
    code: "Code",
    finance: "Finance",
    ai: "AI",
    tools: "Tools",
    business: "Business",
};

/** Pill colors per tag: dark text on a light tint (AA contrast at 12px) */
export const noteTagColor: Record<NoteTag, string> = {
    code: "bg-sky-50 text-sky-800",
    finance: "bg-amber-50 text-amber-800",
    ai: "bg-violet-50 text-violet-700",
    tools: "bg-rose-50 text-rose-700",
    business: "bg-teal/10 text-teal",
};

export type Note = {
    /** URL: /notes/<slug> */
    slug: string;
    /** A question or a specific claim, under ~60 characters */
    title: string;
    /** The answer in one sentence, under ~155 characters - meta description and list text */
    description: string;
    /** YYYY-MM-DD */
    date: string;
    /** YYYY-MM-DD, set when the facts change */
    updated?: string;
    tag: NoteTag;
    /** The X/LinkedIn post this note grew from */
    source?: { label: string; url: string };
    /** Shown in `next dev` only */
    draft?: boolean;
    body: ReactNode;
};
