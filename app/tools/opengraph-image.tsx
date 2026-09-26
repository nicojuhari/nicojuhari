import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Free browser tools for everyday tasks";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Free tools",
        title: alt,
        text: "QR codes, image cropping, checklists, word counts and more. No sign-up.",
    });
}
