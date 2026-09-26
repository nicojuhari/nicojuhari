import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "More clients, more sales, less manual work.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Websites \u00b7 Shopify \u00b7 Web apps",
        title: alt,
        text: "Websites that bring in calls from Google and Maps, Shopify stores that sell, and web apps that save your team time.",
    });
}
