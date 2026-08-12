import type { Metadata } from "next";
import ImageCropper from "./_components/image-cropper";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";

export const metadata: Metadata = {
    title: "Square Image Cropper - Crop Photos to 1:1 Square",
    description:
        "Crop any photo to a perfect 1:1 square in your browser - ideal for digital menus, product images, and social media. No upload to a server, free.",
    alternates: { canonical: "https://nicojuhari.com/tools/square-image-cropper" },
};

export default function ImageCropperPage() {
    return (
        <ToolPageShell
            currentSlug="square-image-cropper"
            title="Square Image Cropper"
            description="Crop any photo to a perfect square - great for social media, menus, and product images."
            schema={webAppSchema(
                "Square Image Cropper",
                "Crop any photo to a perfect 1:1 square in your browser - ideal for digital menus, product images, and social media. No upload to a server, free.",
                "square-image-cropper"
            )}
            notes={
                <>
                    <p>Upload a food photo and crop it to a perfect 1:1 square for a consistent menu look.</p>
                    <p>
                        Choose an output size between 600 and 1,000 px - or enter a custom size - so images stay sharp
                        across all devices.
                    </p>
                    <p>Tip: use high-contrast backgrounds and natural light so dishes read well at small sizes.</p>
                </>
            }
        >
            <ImageCropper />
        </ToolPageShell>
    );
}
