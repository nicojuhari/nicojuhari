import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Web apps and websites I built";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Work",
        title: alt,
        text: "EPUfix, a loan management system, Handwerker Netz and client sites - with case studies.",
    });
}
