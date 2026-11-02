import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Notes: what I build, find and use";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "Notes", title: alt, text: "Short notes on code, money, AI and small-business work. Real numbers and screens." });
}
