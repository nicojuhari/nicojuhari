import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "More clients, more sales, less manual work.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Websites \u00b7 Web apps \u00b7 Automations",
        title: alt,
        text: "Websites that bring in calls from Google and Google Maps, and web apps that save your team time.",
    });
}
