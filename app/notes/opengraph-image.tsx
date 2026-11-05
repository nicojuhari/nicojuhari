import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Short ideas about software, business and AI";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "Notes", title: alt, text: "Things I notice while building apps and running small businesses." });
}
