export type ToolCategory = "business" | "text" | "everyday"

export type Tool = {
  slug: string
  title: string
  /** Short name for cards */
  shortTitle?: string
  description: string
  category: ToolCategory
  /** Icon tile colours */
  accent: string
  tint: string
}

export const toolCategoryLabel: Record<ToolCategory, string> = {
  business: "Business",
  text: "Text",
  everyday: "Everyday",
}

/** Filter labels on the tools page */
export const toolFilterLabel: Record<ToolCategory, string> = {
  business: "For business",
  text: "Text",
  everyday: "Everyday",
}

export const tools: Tool[] = [
  {
    slug: "qr-code-generator",
    title: "QR Code Generator",
    description: "Create a custom QR code for any URL",
    category: "business",
    accent: "#16284D",
    tint: "#EEF1F7",
  },
  {
    slug: "square-image-cropper",
    title: "Square Image Cropper",
    description: "Crop images to squares for digital menus",
    category: "business",
    accent: "#A2471A",
    tint: "#FBF1E8",
  },
  {
    slug: "word-counter",
    title: "Word Counter Tool",
    shortTitle: "Word Counter",
    description: "Count words and characters in any text",
    category: "text",
    accent: "#127A6F",
    tint: "#E9F5F3",
  },
  {
    slug: "whitespace-remover",
    title: "Whitespace Remover",
    description: "Clean up spaces, line breaks and slugs",
    category: "text",
    accent: "#7A5E6E",
    tint: "#F4EEF1",
  },
  {
    slug: "online-checklist-maker",
    title: "Online Checklist Maker",
    description: "Keep track of your tasks",
    category: "everyday",
    accent: "#127A6F",
    tint: "#E9F5F3",
  },
  {
    slug: "product-grid-generator",
    title: "Product Grid Generator",
    description: "Add products to Shopify blog posts - no app",
    category: "business",
    accent: "#16284D",
    tint: "#EEF1F7",
  },
  {
    slug: "bill-split-calculator",
    title: "Bill Split Calculator",
    description: "Split bills with friends easily",
    category: "everyday",
    accent: "#A2471A",
    tint: "#FBF1E8",
  },
]
