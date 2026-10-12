"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type Konva from "konva";
import { Group, Image as KImage, Label, Layer as KLayer, Line, Rect, Stage, Tag, Text, Transformer } from "react-konva";
import type { Design, IconLayer, ImageLayer, Layer, TextLayer } from "./data";
import { edges, guideLines, keepInside, nearest, resizeEscapes, touching, type Box } from "./snap";

/** Snap distance in screen pixels, so it feels the same at any zoom */
const SNAP = 6;
const GUIDE = "#e5484d";

type Props = {
    design: Design;
    scale: number;
    selectedId: string | null;
    onSelect: (id: string | null) => void;
    onChange: (id: string, patch: Partial<Layer>) => void;
    /** Bumped after a font loads, so text is measured again */
    fontsVersion: number;
    stageRef?: RefObject<Konva.Stage | null>;
    /** Thumbnail mode - no handles, no mouse */
    preview?: boolean;
    /** Let content go past the padding and off the canvas edges */
    free?: boolean;
};

function useImage(src: string) {
    const [img, setImg] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const image = new window.Image();
        // Without this a URL image taints the canvas and export fails
        image.crossOrigin = "anonymous";
        image.onload = () => setImg(image);
        image.src = src;
        return () => {
            image.onload = null;
        };
    }, [src]);
    return img;
}

function TextNode({ layer, common }: { layer: TextLayer; common: Konva.NodeConfig }) {
    return (
        <Label {...common}>
            <Tag
                fill={layer.bg || undefined}
                stroke={layer.borderWidth ? layer.borderColor : undefined}
                strokeWidth={layer.borderWidth}
                cornerRadius={layer.radius}
            />
            <Text
                text={layer.text}
                width={layer.width}
                fontFamily={`"${layer.font}", sans-serif`}
                fontStyle={String(layer.weight)}
                fontSize={layer.size}
                fill={layer.color}
                align={layer.align}
                lineHeight={layer.lineHeight}
                padding={layer.padding}
            />
        </Label>
    );
}

function ImageNode({ layer, common }: { layer: ImageLayer; common: Konva.NodeConfig }) {
    const img = useImage(layer.src);
    const r = Math.min(layer.radius, layer.width / 2, layer.height / 2);
    return (
        <Group
            {...common}
            clipFunc={(ctx) => {
                ctx.beginPath();
                ctx.roundRect(0, 0, layer.width, layer.height, r);
            }}
        >
            <KImage image={img ?? undefined} width={layer.width} height={layer.height} />
            {layer.borderWidth > 0 && (
                // Double width: the outer half is clipped away, so the border stays inside the image
                <Rect width={layer.width} height={layer.height} cornerRadius={r} stroke={layer.borderColor} strokeWidth={layer.borderWidth * 2} />
            )}
        </Group>
    );
}

function iconSrc(layer: IconLayer) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(layer.svg.replaceAll("currentColor", layer.color))}`;
}

/** Konva fill props for the background - angle works like CSS (0 = to top, 90 = to right) */
function backgroundFill({ width, height, background, gradient }: Design): Konva.RectConfig {
    if (!gradient) return { fill: background };
    const a = (gradient.angle * Math.PI) / 180;
    const dx = Math.sin(a);
    const dy = -Math.cos(a);
    const half = Math.abs((width / 2) * dx) + Math.abs((height / 2) * dy);
    return {
        fillLinearGradientStartPoint: { x: width / 2 - dx * half, y: height / 2 - dy * half },
        fillLinearGradientEndPoint: { x: width / 2 + dx * half, y: height / 2 + dy * half },
        fillLinearGradientColorStops: [0, background, 1, gradient.to],
    };
}

export default function DesignStage({ design, scale, selectedId, onSelect, onChange, fontsVersion, stageRef, preview, free }: Props) {
    const trRef = useRef<Konva.Transformer>(null);
    const [guides, setGuides] = useState<{ v: number[]; h: number[] }>({ v: [], h: [] });
    const padding = design.padding ?? 0;
    const selected = design.layers.find((l) => l.id === selectedId);

    useEffect(() => {
        const tr = trRef.current;
        const node = selectedId ? stageRef?.current?.findOne(`#${selectedId}`) : null;
        tr?.nodes(node ? [node] : []);
        tr?.getLayer()?.batchDraw();
    }, [selectedId, design, fontsVersion, stageRef]);

    const clearGuides = () => setGuides({ v: [], h: [] });

    /** Snap lines from the canvas and every element except `skipId` */
    const linesFor = (stage: Konva.Stage, skipId: string) => {
        const others = design.layers.flatMap((l) => {
            const node = l.id === skipId ? null : stage.findOne(`#${l.id}`);
            return node ? [node.getClientRect({ relativeTo: node.getLayer()! })] : [];
        });
        return guideLines(design.width, design.height, padding, others);
    };

    /** While dragging: snap to the nearest line, keep inside the padding, show every line the element touches */
    const onDragMove = (node: Konva.Node) => {
        const box = () => node.getClientRect({ relativeTo: node.getLayer()! });
        const lines = linesFor(node.getStage()!, node.id());
        const sx = nearest(edges(box(), "x"), lines.v, SNAP / scale);
        const sy = nearest(edges(box(), "y"), lines.h, SNAP / scale);
        node.position({ x: node.x() + (sx?.offset ?? 0), y: node.y() + (sy?.offset ?? 0) });
        if (!free) {
            const { dx, dy } = keepInside(box(), design.width, design.height, padding);
            node.position({ x: node.x() + dx, y: node.y() + dy });
        }
        setGuides({ v: touching(edges(box(), "x"), lines.v), h: touching(edges(box(), "y"), lines.h) });
    };

    /** While resizing: snap the dragged handle to the nearest line (positions here are screen pixels) */
    const snapAnchor = (_old: Konva.Vector2d, pos: Konva.Vector2d) => {
        const node = trRef.current?.nodes()[0];
        if (!node || node.rotation() % 360 !== 0) return pos;
        const lines = linesFor(node.getStage()!, node.id());
        const sx = nearest([pos.x / scale], lines.v, SNAP / scale);
        const sy = nearest([pos.y / scale], lines.h, SNAP / scale);
        setGuides({ v: sx ? [sx.line] : [], h: sy ? [sy.line] : [] });
        return { x: sx ? sx.line * scale : pos.x, y: sy ? sy.line * scale : pos.y };
    };

    const toDesign = (b: Box) => ({ x: b.x / scale, y: b.y / scale, width: b.width / scale, height: b.height / scale });

    const onTransform = (layer: Layer, node: Konva.Node) => {
        // Side handles on text change the box width, not the font size
        if (layer.type !== "text" || !trRef.current?.getActiveAnchor()?.startsWith("middle")) return;
        const text = (node as Konva.Label).getText();
        text.width(Math.max(40, text.width() * node.scaleX()));
        node.scaleX(1);
        node.scaleY(1);
    };

    const onTransformEnd = (layer: Layer, node: Konva.Node) => {
        const sx = node.scaleX();
        const sy = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        const base = { x: node.x(), y: node.y(), rotation: node.rotation() };
        if (layer.type === "text") {
            const width = (node as Konva.Label).getText().width();
            onChange(layer.id, { ...base, width: Math.round(width * sx), size: Math.max(8, Math.round(layer.size * sy)), padding: Math.round(layer.padding * sy) });
        } else {
            onChange(layer.id, { ...base, width: Math.max(10, Math.round(layer.width * sx)), height: Math.max(10, Math.round(layer.height * sy)) });
        }
    };

    return (
        <Stage
            ref={stageRef}
            width={design.width * scale}
            height={design.height * scale}
            scaleX={scale}
            scaleY={scale}
            listening={!preview}
        >
            <KLayer>
                {/* key: Konva keeps stale gradient props when switching back to a solid fill */}
                <Rect key={design.gradient ? "gradient" : "solid"} name="bg" width={design.width} height={design.height} {...backgroundFill(design)} onMouseDown={() => onSelect(null)} onTouchStart={() => onSelect(null)} />
                {design.layers.map((layer) => {
                    const common: Konva.NodeConfig = {
                        id: layer.id,
                        x: layer.x,
                        y: layer.y,
                        rotation: layer.rotation,
                        draggable: true,
                        onMouseDown: () => onSelect(layer.id),
                        onTouchStart: () => onSelect(layer.id),
                        onDragMove: (e: Konva.KonvaEventObject<DragEvent>) => onDragMove(e.target),
                        onDragEnd: (e: Konva.KonvaEventObject<DragEvent>) => {
                            clearGuides();
                            onChange(layer.id, { x: e.target.x(), y: e.target.y() });
                        },
                        onTransform: (e: Konva.KonvaEventObject<Event>) => onTransform(layer, e.target),
                        onTransformEnd: (e: Konva.KonvaEventObject<Event>) => {
                            clearGuides();
                            onTransformEnd(layer, e.target);
                        },
                    };
                    return layer.type === "text" ? (
                        <TextNode key={`${layer.id}-${fontsVersion}`} layer={layer} common={common} />
                    ) : (
                        <ImageNode key={layer.id} layer={layer.type === "icon" ? { ...layer, type: "image", src: iconSrc(layer) } : layer} common={common} />
                    );
                })}
            </KLayer>
            {/* Editor-only layer - hidden during export */}
            <KLayer name="ui" visible={!preview}>
                {padding > 0 && (
                    <Rect
                        x={padding}
                        y={padding}
                        width={design.width - 2 * padding}
                        height={design.height - 2 * padding}
                        stroke="#3b6ef5"
                        strokeWidth={1 / scale}
                        dash={[6 / scale, 4 / scale]}
                        opacity={0.55}
                        listening={false}
                    />
                )}
                {guides.v.map((x) => (
                    <Line key={`v${x}`} points={[x, 0, x, design.height]} stroke={GUIDE} strokeWidth={1 / scale} listening={false} />
                ))}
                {guides.h.map((y) => (
                    <Line key={`h${y}`} points={[0, y, design.width, y]} stroke={GUIDE} strokeWidth={1 / scale} listening={false} />
                ))}
                <Transformer
                    ref={trRef}
                    rotationSnaps={[0, 90, 180, 270]}
                    keepRatio
                    anchorSize={10}
                    anchorCornerRadius={5}
                    borderStroke="#3b6ef5"
                    anchorStroke="#3b6ef5"
                    enabledAnchors={
                        selected?.type === "text"
                            ? ["top-left", "top-right", "bottom-left", "bottom-right", "middle-left", "middle-right"]
                            : ["top-left", "top-right", "bottom-left", "bottom-right"]
                    }
                    anchorDragBoundFunc={snapAnchor}
                    boundBoxFunc={(oldBox, newBox) =>
                        newBox.width < 10 ||
                        newBox.height < 10 ||
                        // shortcut: rotated elements aren't held inside the padding while resizing; good enough until someone asks
                        (!free && Math.abs(newBox.rotation) < 0.001 && resizeEscapes(toDesign(oldBox), toDesign(newBox), design.width, design.height, padding))
                            ? oldBox
                            : newBox
                    }
                />
            </KLayer>
        </Stage>
    );
}

