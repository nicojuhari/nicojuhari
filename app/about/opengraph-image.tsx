import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "About Nicolae Cojuhari - full-stack engineer in Vienna";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "About", title: "Full-stack engineer in Vienna", text: "10+ years building web applications. 5 years in banking and credit before that." });
}
