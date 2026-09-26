import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Apps I built and use";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({
        eyebrow: "Projects",
        title: alt,
        text: "Simple Trackr, 1FoodMenu and more - what each one does and how I built it.",
    });
}
