import type { Metadata } from "next";
import MagicWandCanvas from "./_components/magic-wand-canvas";

export const metadata: Metadata = {
    title: "Magic Wand Sparkles - CSS Animation Demo | Nicojuhari",
    description:
        "Move your cursor to leave a trail of sparkles that float and fade. A small interactive demo built with JavaScript and CSS animations. No libraries.",
};

export default function MagicWandPage() {
    return <MagicWandCanvas />;
}
