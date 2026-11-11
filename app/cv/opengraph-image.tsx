import { ogImage, OG_SIZE } from "@/app/_lib/og";

export const alt = "CV - Nicolae Cojuhari, Senior Full-Stack Engineer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
    return ogImage({ eyebrow: "CV", title: "Nicolae Cojuhari, Senior Full-Stack Engineer", text: "10+ years building web applications. TypeScript, React, Next.js, Node.js, PostgreSQL. Vienna." });
}
