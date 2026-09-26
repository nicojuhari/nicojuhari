import type { Metadata } from "next";
import ImageCropper from "./_components/image-cropper";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION =
    "Crop menu, food and product photos to a 1:1 square in your browser - one image or a whole batch. Download JPEG, WebP or PNG. Free, no uploads.";

export const metadata: Metadata = pageMetadata({
    title: "Square Image Cropper - Crop Menu & Product Photos to 1:1",
    description: DESCRIPTION,
    path: "/tools/square-image-cropper",
});

const tips = [
    {
        label: "Batch",
        title: "Crop a whole menu at once",
        text: "Add up to 30 photos, adjust the ones that need it - the rest are cropped from the center - and download them all as one ZIP, ready for a digital menu like 1FoodMenu.",
    },
    {
        label: "Size",
        title: "800–1,000 px is plenty",
        text: "That stays sharp on phones and retina screens. If the crop is smaller than the size you pick, you’ll see a warning before it looks soft.",
    },
    {
        label: "Private",
        title: "Nothing is uploaded",
        text: "Images are cropped in your browser and never leave your device. JPEG or WebP keep files small; PNG keeps transparency.",
    },
];

export default function ImageCropperPage() {
    return (
        <ToolPageShell
            currentSlug="square-image-cropper"
            title="Square Image Cropper"
            description="Crop photos to a perfect square - one at a time or a whole batch for your menu, shop or social media."
            perks={["Free", "No sign-up", "No uploads"]}
            schema={webAppSchema("Square Image Cropper", DESCRIPTION, "square-image-cropper")}
            tips={tips}
            bare
        >
            <ImageCropper />
        </ToolPageShell>
    );
}
