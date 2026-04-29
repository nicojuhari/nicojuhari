import type { Metadata } from "next"
import ImageCropper from "./_components/image-cropper"

export const metadata: Metadata = {
  title: "Square Image Cropper - Perfect for Digital Menus",
  description: "Use our Square Image Cropper and create fast, consistent digital menus by cropping food photos to a perfect 1:1 square.",
}

export default function ImageCropperPage() {
  return (
    <div className="section px-6 max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">Square Image Cropper</h1>
      <p className="text-muted-foreground mb-8">Make uniform 1:1 food photos fast — perfect for digital food menus.</p>
      <ImageCropper />
    </div>
  )
}
