import { ogImage, OG_SIZE } from "@/app/_lib/og";
import { getCaseStudy } from "@/app/_data/case-studies";

export const alt = "Case study by Nicolae Cojuhari";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const c = getCaseStudy((await params).slug)!;
    return ogImage({ eyebrow: "Case study", title: c.title, text: c.summary });
}
