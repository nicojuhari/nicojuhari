import type { Metadata } from "next";
import ImageCropper from "./_components/image-cropper";

export const metadata: Metadata = {
    title: "Square Image Cropper - Perfect for Digital Menus",
    description: "Use our Square Image Cropper and create fast, consistent digital menus by cropping food photos to a perfect 1:1 square.",
};

export default function ImageCropperPage() {
    return (
        <div className="section px-6 max-w-3xl">
            <h1 className="text-3xl font-bold mb-2">Square Image Cropper</h1>
            <h2 className="text-lg text-muted-foreground mb-8 font-normal">Crop any photo to a perfect square — great for social media, menus, and product images.</h2>
            <ImageCropper />
            <div className="mt-12 space-y-3 text-sm text-muted-foreground">
                <p>Upload a food photo and crop it to a perfect 1:1 square for a consistent menu look.</p>
                <p>Choose an output size between 600 and 1,000 px - or enter a custom size - so images stay sharp across all devices.</p>
                <p>
                    Drag the crop box to keep the dish centered, download the result, then run it through TinyPNG to reduce file size for
                    faster loading.
                </p>
                <p>Tip: use high-contrast backgrounds and natural light so dishes read well at small sizes.</p>
            </div>
        </div>
    );
}
