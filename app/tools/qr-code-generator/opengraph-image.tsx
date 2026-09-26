import { ogImage, OG_SIZE } from "@/app/_lib/og";
import { tools } from "@/app/_data/tools";

const tool = tools.find((t) => t.slug === "qr-code-generator")!;

export const alt = tool.title;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "Free tool", title: tool.title, text: `${tool.description}. Free, no sign-up.` });
}
