import { ogImage, OG_SIZE } from "@/app/_lib/og";
import { getNote, noteTagLabel } from "../_content";

export const alt = "Note by Nicolae Cojuhari";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const note = getNote((await params).slug)!;
    return ogImage({ eyebrow: `Note · ${noteTagLabel[note.tag]}`, title: note.title, text: note.description });
}
