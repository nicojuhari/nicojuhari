import type { Metadata } from "next";
import Designer from "./_components/designer";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Make social media images in your browser - Instagram, Facebook, X, LinkedIn, YouTube and Pinterest sizes. Add text with Google fonts, photos and emoji, then download a sharp PNG or JPEG. Free, no uploads.";

export const metadata: Metadata = pageMetadata({
    title: "Social Media Image Maker - Free Post & Story Designer",
    description: DESCRIPTION,
    path: "/tools/social-media-image-maker",
});

const tips = [
    {
        label: "Sizes",
        title: "The right size for each platform",
        text: "Pick Instagram, Story, Facebook, X, LinkedIn, YouTube or Pinterest, or type your own size. The file you download is exactly that many pixels.",
    },
    {
        label: "Fonts",
        title: "Google fonts, ready to use",
        text: "Choose from popular Google fonts, set the size and color, and give text a box with padding, a border and round corners.",
    },
    {
        label: "Private",
        title: "Nothing is uploaded",
        text: "Your design and photos stay in this browser. Next time you open the page, your last design is still here.",
    },
];

export default function SocialImageMakerPage() {
    return (
        <ToolPageShell
            currentSlug="social-media-image-maker"
            title="Social Media Image Maker"
            description="Design a post, story or thumbnail in the right size - add text, photos, icons and emoji, then download or copy it."
            perks={["Free", "No sign-up", "No uploads"]}
            schema={webAppSchema("Social Media Image Maker", DESCRIPTION, "social-media-image-maker")}
            tips={tips}
            bare
        >
            <Designer />
        </ToolPageShell>
    );
}
