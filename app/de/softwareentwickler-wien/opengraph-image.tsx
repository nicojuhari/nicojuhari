import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Freelancer für Softwareentwicklung in Wien: mehr Kunden, weniger Handarbeit";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Freelancer · Softwareentwicklung",
        title: "Softwareentwickler in Wien",
        text: "Websites und Apps, die mehr Anrufe, Buchungen und Aufträge bringen.",
    });
}
