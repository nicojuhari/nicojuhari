import { googleAds660Conversions } from "./google-ads-vs-shopify-conversions";
import { onePersonBusinessesInNumbers } from "./one-person-businesses-in-numbers";
import { trustOnlineAi } from "./trust-ai-online";
import type { Note } from "./types";
import { whyCompetitorOnGoogleMaps } from "./why-competitor-shows-up-on-google-maps";
import { whyIBuiltEpufix } from "./why-i-built-epufix";

export * from "./types";

/** Add every note here */
const all: Note[] = [whyCompetitorOnGoogleMaps, trustOnlineAi, onePersonBusinessesInNumbers, googleAds660Conversions, whyIBuiltEpufix];

/** Newest first; drafts only in `next dev` */
export const notes = all
    .filter((n) => !n.draft || process.env.NODE_ENV !== "production")
    .sort((a, b) => b.date.localeCompare(a.date));

export const getNote = (slug: string) => notes.find((n) => n.slug === slug);

export const formatDate = (date: string) =>
    new Date(`${date}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
