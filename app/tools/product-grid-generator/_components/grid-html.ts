export type Product = { id: string; title: string; image: string; url: string; price: string; description: string };

export type GridOptions = {
    layout: "grid" | "carousel";
    columns: 2 | 3 | 4;
    ratio: "square" | "portrait";
    radius: 0 | 8 | 16;
    showPrice: boolean;
    showDescription: boolean;
    button: string;
    buttonColor: string;
    newTab: boolean;
};

export const DEFAULT_OPTIONS: GridOptions = {
    layout: "grid",
    columns: 4,
    ratio: "square",
    radius: 8,
    showPrice: true,
    showDescription: true,
    button: "Shop now",
    buttonColor: "#16284d",
    newTab: false,
};

export const LIMITS = { title: 120, price: 30, description: 300, button: 30, url: 2000 };

export function uid() {
    return Math.random().toString(36).slice(2, 10);
}

export const EXAMPLE_PRODUCTS: Product[] = [1, 2, 3, 4].map((n) => ({
    id: `example-${n}`,
    title: `Example product ${n}`,
    image: `https://nicojuhari.b-cdn.net/tools/grid/product-${n}.webp`,
    url: "/collections/all",
    price: `$${(19.99 + (n - 1) * 10).toFixed(2)}`,
    description: n === 1 ? "A short line about what makes it worth buying." : "",
}));

// ─── Validation ───────────────────────────────────────────────────────────────

/** A full http(s) address */
export function isWebUrl(value: string) {
    try {
        const url = new URL(value);
        return (url.protocol === "https:" || url.protocol === "http:") && url.hostname.includes(".");
    } catch {
        return false;
    }
}

/** Product links may also be a path on the same shop, like /products/mug */
export function isProductUrl(value: string) {
    return isWebUrl(value) || /^\/[^\s/][^\s]*$/.test(value) || value === "/";
}

export type ProductErrors = Partial<Record<"title" | "image" | "url", string>>;

export function validateProduct(p: Omit<Product, "id">): ProductErrors {
    const errors: ProductErrors = {};
    if (!p.title.trim()) errors.title = "Add a product name";
    if (!p.image.trim()) errors.image = "Add an image link";
    else if (!isWebUrl(p.image.trim())) errors.image = "Use a full image link starting with https://";
    if (!p.url.trim()) errors.url = "Add the product link";
    else if (!isProductUrl(p.url.trim())) errors.url = "Use https://… or a shop path like /products/mug";
    return errors;
}

// ─── HTML output ──────────────────────────────────────────────────────────────

function escapeHtml(value: string) {
    return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

function safeColor(value: string) {
    return /^#[0-9a-f]{6}$/i.test(value) ? value : DEFAULT_OPTIONS.buttonColor;
}

export function buildHtml(products: Product[], o: GridOptions): string {
    if (!products.length) return "";
    const target = o.newTab ? ' target="_blank" rel="noopener"' : "";
    const button = o.button.trim();

    const items = products
        .map((p) => {
            const lines = [
                `  <a class="nc-product" href="${escapeHtml(p.url.trim())}"${target}>`,
                `    <img class="nc-product__img" src="${escapeHtml(p.image.trim())}" alt="${escapeHtml(p.title.trim())}" loading="lazy">`,
                `    <div class="nc-product__body">`,
                `      <p class="nc-product__title">${escapeHtml(p.title.trim())}</p>`,
                o.showDescription && p.description.trim() && `      <p class="nc-product__desc">${escapeHtml(p.description.trim())}</p>`,
                o.showPrice && p.price.trim() && `      <p class="nc-product__price">${escapeHtml(p.price.trim())}</p>`,
                button && `      <span class="nc-product__btn">${escapeHtml(button)}</span>`,
                `    </div>`,
                `  </a>`,
            ];
            return lines.filter(Boolean).join("\n");
        })
        .join("\n");

    const radius = `${o.radius}px`;
    const layout =
        o.layout === "grid"
            ? `.nc-products{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px}
@media (min-width:768px){.nc-products{grid-template-columns:repeat(${o.columns},minmax(0,1fr))}}`
            : `.nc-products{display:flex;gap:16px;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px}
.nc-products .nc-product{flex:0 0 min(72%,260px);scroll-snap-align:start}`;

    const css = `${layout}
.nc-products{margin:24px 0}
.nc-product{display:flex;flex-direction:column;overflow:hidden;background:#fff;border:1px solid #e6e3dc;border-radius:${radius};color:inherit;text-decoration:none}
.nc-product__img{display:block;width:100%;aspect-ratio:${o.ratio === "square" ? "1/1" : "4/5"};object-fit:cover;background:#f4f3ef}
.nc-product__body{display:flex;flex:1;flex-direction:column;gap:6px;padding:12px 14px 14px}
.nc-product__title{margin:0;font-size:1rem;font-weight:600;line-height:1.3}
.nc-product__desc{margin:0;font-size:.85rem;line-height:1.4;opacity:.75;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.nc-product__price{margin:auto 0 0;font-weight:600}
.nc-product__btn{display:block;margin-top:8px;padding:9px 12px;border-radius:${radius};background:${safeColor(o.buttonColor)};color:#fff;font-size:.875rem;font-weight:600;text-align:center}`;

    return `<div class="nc-products">\n${items}\n</div>\n<style>\n${css}\n</style>`;
}

/** Full page for the sandboxed preview frame */
export function previewDocument(html: string) {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><base target="_blank"><style>body{margin:0;padding:4px 16px;font-family:system-ui,-apple-system,sans-serif;color:#111418;background:#fff}</style></head><body>${html}</body></html>`;
}
