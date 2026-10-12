/** Alignment math for the canvas - all values are in design pixels */

export type Box = { x: number; y: number; width: number; height: number };

/** Left/center/right (or top/middle/bottom) edges of a box on one axis */
export const edges = (b: Box, axis: "x" | "y") =>
    axis === "x" ? [b.x, b.x + b.width / 2, b.x + b.width] : [b.y, b.y + b.height / 2, b.y + b.height];

/** Lines worth snapping to: canvas edges and center, padding edges, and other elements' edges and centers */
export function guideLines(width: number, height: number, padding: number, others: Box[]) {
    const v = [0, padding, width / 2, width - padding, width, ...others.flatMap((b) => edges(b, "x"))];
    const h = [0, padding, height / 2, height - padding, height, ...others.flatMap((b) => edges(b, "y"))];
    return { v: [...new Set(v)], h: [...new Set(h)] };
}

/** The smallest move that puts one of `points` on one of `lines`, if it is within `limit` */
export function nearest(points: number[], lines: number[], limit: number) {
    let best: { offset: number; line: number } | null = null;
    for (const p of points)
        for (const line of lines) {
            const offset = line - p;
            if (Math.abs(offset) <= limit && (!best || Math.abs(offset) < Math.abs(best.offset))) best = { offset, line };
        }
    return best;
}

/** Lines that some point already sits on - drawn as guides */
export const touching = (points: number[], lines: number[]) => lines.filter((l) => points.some((p) => Math.abs(p - l) < 0.5));

/** Move that keeps a box inside the padding. An axis is left free when the box is bigger than the safe area (e.g. a full-bleed photo). */
export function keepInside(b: Box, width: number, height: number, padding: number) {
    const axis = (start: number, size: number, total: number) => {
        if (size > total - 2 * padding) return 0;
        if (start < padding) return padding - start;
        if (start + size > total - padding) return total - padding - (start + size);
        return 0;
    };
    return { dx: axis(b.x, b.width, width), dy: axis(b.y, b.height, height) };
}

/** True when a resize pushes an edge further past the padding than it already was */
export function resizeEscapes(oldBox: Box, newBox: Box, width: number, height: number, padding: number) {
    const right = (b: Box) => b.x + b.width;
    const bottom = (b: Box) => b.y + b.height;
    return (
        (newBox.x < padding && newBox.x < oldBox.x) ||
        (newBox.y < padding && newBox.y < oldBox.y) ||
        (right(newBox) > width - padding && right(newBox) > right(oldBox)) ||
        (bottom(newBox) > height - padding && bottom(newBox) > bottom(oldBox))
    );
}
