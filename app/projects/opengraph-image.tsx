import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Websites, stores and apps I built";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Projects",
        title: alt,
        text: "Businesses I run, client websites and apps like Simple Trackr - what each one does and what I built.",
    });
}
