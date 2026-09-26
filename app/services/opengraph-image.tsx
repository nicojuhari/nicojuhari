import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Local websites, Shopify stores and custom web apps";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Services",
        title: alt,
        text: "More calls from Google and Maps, more online sales, and hours saved every week.",
    });
}
