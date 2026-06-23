import type { Metadata } from "next";
import EmojiRainCanvas from "./_components/emoji-rain-canvas";

export const metadata: Metadata = {
    title: "Rain of Emojis - Emoji Animation Playground | Nicojuhari",
    description:
        "Watch a shower of random emojis fall down the screen - a small, playful demo built with React and CSS animations. Click to change the emoji or speed.",
};

export default function RainOfEmojisPage() {
    return <EmojiRainCanvas />;
}
