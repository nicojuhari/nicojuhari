import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "The tools I work with";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "Uses", title: alt, text: "What I use to build websites and apps, run my numbers and find customers, and why." });
}
