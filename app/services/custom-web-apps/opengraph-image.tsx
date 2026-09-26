import { ogImage, OG_SIZE } from "@/app/_lib/og";
import { getService } from "@/app/_data/services";

const service = getService("custom-web-apps");

export const alt = service.headline;
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: service.title, title: service.headline, text: service.label });
}
