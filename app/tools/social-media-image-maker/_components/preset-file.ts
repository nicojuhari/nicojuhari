import { z } from "zod";
import { FONTS, MAX_SIDE, MIN_SIDE, type Design } from "./data";

export type Preset = { id: string; name: string; design: Design };

const FILE_KIND = "nicojuhari-social-image";

const hex = z.string().regex(/^#[0-9a-f]{6}$/i);
const num = z.number().finite();
const box = { x: num, y: num, rotation: num, width: num.positive().max(20000) };

const textLayer = z.object({
    ...box,
    id: z.string().max(40),
    type: z.literal("text"),
    text: z.string().max(5000),
    font: z.enum(FONTS.map((f) => f.name) as [string, ...string[]]),
    weight: z.union([z.literal(400), z.literal(700)]),
    size: num.min(1).max(2000),
    color: hex,
    align: z.enum(["left", "center", "right"]),
    lineHeight: num.min(0.5).max(5),
    bg: z.union([hex, z.literal("")]),
    padding: num.min(0).max(1000),
    borderColor: hex,
    borderWidth: num.min(0).max(200),
    radius: num.min(0).max(10000),
});

const imageBase = { ...box, id: z.string().max(40), height: num.positive().max(20000), radius: num.min(0).max(10000), borderColor: hex, borderWidth: num.min(0).max(200) };

const imageLayer = z.object({
    ...imageBase,
    type: z.literal("image"),
    // Only pictures: embedded images or web links
    src: z.string().regex(/^(data:image\/(png|jpeg|webp|gif);base64,|https:\/\/)/),
});

const iconLayer = z.object({
    ...imageBase,
    type: z.literal("icon"),
    svg: z.string().startsWith("<svg").max(20000),
    color: hex,
});

const design = z.object({
    width: z.number().int().min(MIN_SIDE).max(MAX_SIDE),
    height: z.number().int().min(MIN_SIDE).max(MAX_SIDE),
    background: hex,
    gradient: z.object({ to: hex, angle: num.min(0).max(360) }).optional(),
    padding: num.min(0).max(1000).optional(),
    layers: z.array(z.discriminatedUnion("type", [textLayer, imageLayer, iconLayer])).max(200),
});

const presetFile = z.object({ kind: z.literal(FILE_KIND), version: z.literal(1), name: z.string().trim().min(1).max(80), design });

export function presetToJson(preset: Preset) {
    return JSON.stringify({ kind: FILE_KIND, version: 1, name: preset.name, design: preset.design }, null, 2);
}

/** Reads an uploaded preset file - returns null when it isn't a valid preset */
export function parsePreset(json: string): { name: string; design: Design } | null {
    try {
        const result = presetFile.safeParse(JSON.parse(json));
        return result.success ? result.data : null;
    } catch {
        return null;
    }
}
