import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Full-Stack Engineer in Vienna";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Nicolae Cojuhari \u00b7 Vienna",
        title: "Full-Stack Engineer in Vienna",
        text: "10+ years of web applications - from bwin to a loan system a credit company runs on every day.",
    });
}
