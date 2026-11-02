import type { ReactNode } from "react";

export type NoteTag = "code" | "finance" | "ai" | "tools" | "business";

export const noteTagLabel: Record<NoteTag, string> = {
    code: "Code",
    finance: "Finance",
    ai: "AI",
    tools: "Tools",
    business: "Business",
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
