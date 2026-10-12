import type { Platform } from "./platform-icons";

export type TextLayer = {
    id: string;
    type: "text";
    text: string;
    x: number;
    y: number;
    rotation: number;
    /** Box width - text wraps inside it */
    width: number;
    font: string;
    weight: 400 | 700;
    size: number;
    color: string;
    align: "left" | "center" | "right";
    lineHeight: number;
    /** Box background, "" = none */
    bg: string;
    padding: number;
    borderColor: string;
    borderWidth: number;
    radius: number;
};

export type ImageLayer = {
    id: string;
    type: "image";
    src: string;
    x: number;
    y: number;
    rotation: number;
    width: number;
    height: number;
    radius: number;
    borderColor: string;
    borderWidth: number;
};

/** A Lucide icon - `svg` is its markup with currentColor, recolored when drawn */
export type IconLayer = Omit<ImageLayer, "type" | "src"> & { type: "icon"; svg: string; color: string };

export type Layer = TextLayer | ImageLayer | IconLayer;

export type Design = {
    width: number;
    height: number;
    /** Solid color, or the first gradient color */
    background: string;
    /** Missing = solid background */
    gradient?: { to: string; angle: number };
    /** Safe area: content is kept this far from the edges. Missing = 0 */
    padding?: number;
    layers: Layer[];
};

export const MIN_SIDE = 100;
export const MAX_SIDE = 4000;

export const SIZES: { id: string; label: string; width: number; height: number; platforms: Platform[] }[] = [
    { id: "ig-post", label: "Instagram post", width: 1080, height: 1080, platforms: ["instagram"] },
    { id: "ig-portrait", label: "Instagram portrait", width: 1080, height: 1350, platforms: ["instagram"] },
    { id: "story", label: "Story / Reel", width: 1080, height: 1920, platforms: ["instagram", "tiktok"] },
    { id: "facebook", label: "Facebook post", width: 1200, height: 630, platforms: ["facebook"] },
    { id: "x", label: "X post", width: 1600, height: 900, platforms: ["x"] },
    { id: "linkedin", label: "LinkedIn post", width: 1200, height: 627, platforms: ["linkedin"] },
    { id: "youtube", label: "YouTube thumbnail", width: 1280, height: 720, platforms: ["youtube"] },
    { id: "pinterest", label: "Pinterest pin", width: 1000, height: 1500, platforms: ["pinterest"] },
];

/** Google fonts with the weights they actually have - the css2 API rejects a weight a font lacks */
export const FONTS: { name: string; weights: (400 | 700)[] }[] = [
    { name: "Inter", weights: [400, 700] },
    { name: "Poppins", weights: [400, 700] },
    { name: "Montserrat", weights: [400, 700] },
    { name: "Roboto", weights: [400, 700] },
    { name: "Open Sans", weights: [400, 700] },
    { name: "Lato", weights: [400, 700] },
    { name: "Raleway", weights: [400, 700] },
    { name: "Nunito", weights: [400, 700] },
    { name: "Work Sans", weights: [400, 700] },
    { name: "DM Sans", weights: [400, 700] },
    { name: "Space Grotesk", weights: [400, 700] },
    { name: "Oswald", weights: [400, 700] },
    { name: "Bebas Neue", weights: [400] },
    { name: "Anton", weights: [400] },
    { name: "Archivo Black", weights: [400] },
    { name: "Playfair Display", weights: [400, 700] },
    { name: "Lora", weights: [400, 700] },
    { name: "Merriweather", weights: [400, 700] },
    { name: "DM Serif Display", weights: [400] },
    { name: "Caveat", weights: [400, 700] },
    { name: "Pacifico", weights: [400] },
    { name: "Permanent Marker", weights: [400] },
    { name: "JetBrains Mono", weights: [400, 700] },
];

export const GRADIENTS: { from: string; to: string; angle: number }[] = [
    { from: "#16284D", to: "#3B6EF5", angle: 135 },
    { from: "#FF7A59", to: "#FFC75F", angle: 135 },
    { from: "#127A6F", to: "#7EE0C3", angle: 160 },
    { from: "#7A5E6E", to: "#F4B6C2", angle: 120 },
    { from: "#0F0F12", to: "#4A4A55", angle: 180 },
    { from: "#FBF1E8", to: "#E8D3FF", angle: 90 },
];

export const DEFAULT_TEXT: Omit<TextLayer, "id" | "x" | "y" | "width"> = {
    type: "text",
    text: "Your text here",
    rotation: 0,
    font: "Inter",
    weight: 700,
    size: 72,
    color: "#16284D",
    align: "center",
    lineHeight: 1.2,
    bg: "",
    padding: 0,
    borderColor: "#16284D",
    borderWidth: 0,
    radius: 0,
};

export const DEFAULT_DESIGN: Design = {
    width: 1080,
    height: 1080,
    background: "#F4F1EA",
    layers: [{ ...DEFAULT_TEXT, id: "t1", text: "Your headline here", x: 90, y: 460, width: 900 }],
};

/** Text layer with defaults filled in - keeps the templates readable */
const text = (layer: Partial<TextLayer> & Pick<TextLayer, "id" | "text" | "x" | "y" | "width">): TextLayer => ({ ...DEFAULT_TEXT, ...layer });

export const TEMPLATES: { id: string; label: string; design: Design }[] = [
    {
        id: "quote",
        label: "Quote",
        design: {
            width: 1080,
            height: 1080,
            background: "#16284D",
            gradient: { to: "#2B4A8A", angle: 160 },
            layers: [
                text({ id: "q1", text: "“", x: 90, y: 60, width: 300, font: "Playfair Display", size: 260, color: "#E8B04B", align: "left", lineHeight: 1 }),
                text({ id: "q2", text: "Simple tools that people actually use beat clever tools nobody opens.", x: 90, y: 330, width: 900, font: "Playfair Display", weight: 400, size: 64, color: "#FFFFFF", align: "left", lineHeight: 1.3 }),
                text({ id: "q3", text: " ", x: 90, y: 720, width: 90, size: 6, lineHeight: 1, bg: "#E8B04B" }),
                text({ id: "q4", text: "Your Name", x: 90, y: 760, width: 900, size: 36, color: "#FFFFFF", align: "left" }),
                text({ id: "q5", text: "Founder, Your Company", x: 90, y: 812, width: 900, weight: 400, size: 30, color: "#A9B8DA", align: "left" }),
            ],
        },
    },
    {
        id: "sale",
        label: "Sale",
        design: {
            width: 1080,
            height: 1080,
            background: "#FF7A59",
            gradient: { to: "#FFC75F", angle: 135 },
            layers: [
                text({ id: "s1", text: "SUMMER SALE", x: 90, y: 160, width: 900, font: "Montserrat", size: 56, color: "#FFFFFF" }),
                text({ id: "s2", text: "-30%", x: 90, y: 250, width: 900, font: "Anton", weight: 400, size: 300, color: "#FFFFFF", lineHeight: 1 }),
                text({ id: "s3", text: "on everything this week", x: 90, y: 590, width: 900, font: "Montserrat", weight: 400, size: 46, color: "#FFFFFF" }),
                text({ id: "s4", text: "Shop now", x: 360, y: 740, width: 360, font: "Montserrat", size: 42, color: "#FF7A59", bg: "#FFFFFF", padding: 30, radius: 999 }),
                text({ id: "s5", text: "Ends Sunday · yourshop.com", x: 90, y: 940, width: 900, font: "Montserrat", weight: 400, size: 30, color: "#FFFFFF" }),
            ],
        },
    },
    {
        id: "announcement",
        label: "Announcement",
        design: {
            width: 1080,
            height: 1350,
            background: "#FBF1E8",
            layers: [
                text({ id: "a1", text: "NEW", x: 440, y: 220, width: 200, font: "Poppins", size: 36, color: "#FFFFFF", bg: "#A2471A", padding: 22, radius: 999 }),
                text({ id: "a2", text: "Big news\nis here", x: 60, y: 370, width: 960, font: "Bebas Neue", weight: 400, size: 200, color: "#A2471A", lineHeight: 0.95 }),
                text({ id: "a3", text: "Tell people what changed and why it helps them.", x: 140, y: 800, width: 800, font: "Poppins", weight: 400, size: 44, color: "#3A2A20", lineHeight: 1.4 }),
                text({ id: "a4", text: "Learn more →", x: 345, y: 1000, width: 390, font: "Poppins", size: 38, color: "#FBF1E8", bg: "#3A2A20", padding: 28, radius: 999 }),
                text({ id: "a5", text: "🎉", x: 830, y: 1150, width: 200, size: 120, rotation: 12 }),
            ],
        },
    },
    {
        id: "event",
        label: "Event",
        design: {
            width: 1080,
            height: 1350,
            background: "#0F0F12",
            gradient: { to: "#2B2F6B", angle: 160 },
            layers: [
                text({ id: "e1", text: "LIVE WEBINAR", x: 90, y: 140, width: 310, size: 30, color: "#0F0F12", bg: "#7EE0C3", padding: 16, radius: 10 }),
                text({ id: "e2", text: "How small shops get their first 100 customers", x: 90, y: 260, width: 900, size: 92, color: "#FFFFFF", align: "left", lineHeight: 1.08 }),
                text({ id: "e3", text: "📅  Thu, 24 Oct · 18:00 CET", x: 90, y: 680, width: 640, weight: 400, size: 38, color: "#FFFFFF", align: "left", padding: 26, borderColor: "#FFFFFF", borderWidth: 2, radius: 18 }),
                text({ id: "e4", text: "with Your Name", x: 90, y: 850, width: 900, weight: 400, size: 38, color: "#B9C0E8", align: "left" }),
                text({ id: "e5", text: "Save your seat →", x: 90, y: 1100, width: 460, size: 38, color: "#0F0F12", bg: "#7EE0C3", padding: 28, radius: 999 }),
            ],
        },
    },
    {
        id: "testimonial",
        label: "Testimonial",
        design: {
            width: 1080,
            height: 1080,
            background: "#FFFFFF",
            layers: [
                text({ id: "r1", text: "★★★★★", x: 90, y: 170, width: 900, weight: 400, size: 64, color: "#E8B04B" }),
                text({ id: "r2", text: "“They set up our online menu in one afternoon. Orders went up the same week.”", x: 110, y: 290, width: 860, font: "Lora", weight: 400, size: 54, color: "#1D2330", lineHeight: 1.35 }),
                text({ id: "r3", text: "👩‍🍳", x: 470, y: 660, width: 140, size: 90, lineHeight: 1 }),
                text({ id: "r4", text: "Customer name", x: 90, y: 800, width: 900, size: 36, color: "#1D2330" }),
                text({ id: "r5", text: "Owner, Your Café", x: 90, y: 852, width: 900, weight: 400, size: 30, color: "#6B7280" }),
            ],
        },
    },
    {
        id: "tip",
        label: "LinkedIn tip",
        design: {
            width: 1200,
            height: 627,
            background: "#E9F5F3",
            layers: [
                text({ id: "p1", text: "💡 TIP", x: 80, y: 80, width: 220, font: "Space Grotesk", size: 34, color: "#127A6F", bg: "#FFFFFF", padding: 18, borderColor: "#127A6F", borderWidth: 3, radius: 16 }),
                text({ id: "p2", text: "Write the benefit first, the feature second.", x: 80, y: 210, width: 1000, font: "Space Grotesk", size: 74, color: "#0D3D38", align: "left", lineHeight: 1.12 }),
                text({ id: "p3", text: "@yourname · save this for later", x: 80, y: 500, width: 800, font: "Space Grotesk", weight: 400, size: 30, color: "#127A6F", align: "left" }),
            ],
        },
    },
    {
        id: "story",
        label: "Story question",
        design: {
            width: 1080,
            height: 1920,
            background: "#6D5BD0",
            gradient: { to: "#F4B6C2", angle: 160 },
            layers: [
                text({ id: "k1", text: "ASK ME\nANYTHING", x: 90, y: 380, width: 900, font: "Bebas Neue", weight: 400, size: 210, color: "#FFFFFF", lineHeight: 0.95 }),
                text({ id: "k2", text: "Type your question here…", x: 140, y: 880, width: 800, weight: 400, size: 44, color: "#8A8AA3", bg: "#FFFFFF", padding: 50, radius: 36 }),
                text({ id: "k3", text: "👇", x: 420, y: 1160, width: 240, size: 160, lineHeight: 1 }),
                text({ id: "k4", text: "@yourname", x: 90, y: 1620, width: 900, size: 42, color: "#FFFFFF" }),
            ],
        },
    },
    {
        id: "thumbnail",
        label: "YouTube thumbnail",
        design: {
            width: 1280,
            height: 720,
            background: "#0F0F12",
            gradient: { to: "#4A4A55", angle: 120 },
            layers: [
                text({ id: "y1", text: "I TRIED IT\nFOR 30 DAYS", x: 60, y: 140, width: 780, font: "Anton", weight: 400, size: 140, color: "#FFFFFF", align: "left", lineHeight: 1.02 }),
                text({ id: "y2", text: "HONEST RESULTS", x: 60, y: 470, width: 470, font: "Anton", weight: 400, size: 56, color: "#0F0F12", bg: "#FFD60A", padding: 18, radius: 8 }),
                text({ id: "y3", text: "😱", x: 820, y: 190, width: 420, size: 300, lineHeight: 1 }),
            ],
        },
    },
];

const loaded = new Set<string>();

/** Loads a Google font (both weights it has) - resolves once the browser can draw it */
export async function loadFont(name: string) {
    const font = FONTS.find((f) => f.name === name);
    if (!font || loaded.has(name)) return;
    loaded.add(name);
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(name)}:wght@${font.weights.join(";")}&display=swap`;
    await new Promise((resolve) => {
        link.onload = link.onerror = resolve;
        document.head.append(link);
    });
    await Promise.all(font.weights.map((w) => document.fonts.load(`${w} 40px "${name}"`).catch(() => {})));
}
