import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Softwareentwickler in Wien - für mehr Kunden und weniger Handarbeit";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Freelancer · Wien",
        title: "Softwareentwickler in Wien",
        text: "Websites und Apps, die mehr Anrufe, Buchungen und Aufträge bringen.",
    });
}
