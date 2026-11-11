import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "Lebenslauf - Nicolae Cojuhari, Senior Full-Stack Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "Lebenslauf", title: "Nicolae Cojuhari, Senior Full-Stack Engineer", text: "Über 10 Jahre Webentwicklung. TypeScript, React, Next.js, Node.js, PostgreSQL. Wien." });
}
