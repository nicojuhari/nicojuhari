/** All amounts are whole cents so sums and splits stay exact. */

export const CURRENCIES = ["EUR", "USD", "GBP", "CHF", "RON", "MDL", "PLN", "CZK", "HUF", "SEK", "NOK", "DKK", "CAD", "AUD"] as const;
/** "" = no currency, amounts shown as plain numbers */
export type Currency = (typeof CURRENCIES)[number] | "";

export const CURRENCY_OPTIONS: { value: Currency; label: string }[] = [
    { value: "", label: "No currency" },
    ...CURRENCIES.map((c) => ({ value: c, label: c })),
];

const MAX_CENTS = 100_000_000_00; // 100 million

/**
 * Parses what people type: "12.50", "12,50", "1,234.50", "1.234,50", "€ 12".
 * Returns cents, or null when it isn't a valid positive amount.
 */
export function parseMoney(raw: string): number | null {
    let value = raw.replace(/[\s'€$£]/g, "");
    if (!value) return null;
    if (!/^[0-9.,]+$/.test(value)) return null;

    const lastComma = value.lastIndexOf(",");
    const lastDot = value.lastIndexOf(".");
    const decimalIndex = Math.max(lastComma, lastDot);

    if (decimalIndex !== -1) {
        const decimals = value.length - decimalIndex - 1;
        const onlyOneKind = lastComma === -1 || lastDot === -1;
        const separator = value[decimalIndex];
        const count = value.split(separator).length - 1;
        // "1,234" or "1.234.567" - a single kind of separator followed by 3 digits is a thousands separator
        if (onlyOneKind && (decimals === 3 || count > 1)) {
            value = value.replace(/[.,]/g, "");
        } else {
            if (decimals > 2) return null;
            value = value.slice(0, decimalIndex).replace(/[.,]/g, "") + "." + value.slice(decimalIndex + 1);
        }
    }

    const amount = Number(value);
    if (!Number.isFinite(amount)) return null;
    const cents = Math.round(amount * 100);
    if (cents <= 0 || cents > MAX_CENTS) return null;
    return cents;
}

/** Cents → "12.50" for editing */
export function centsToInput(cents: number) {
    return (cents / 100).toFixed(2);
}

export function formatMoney(cents: number, currency: Currency) {
    const options: Intl.NumberFormatOptions = currency
        ? { style: "currency", currency }
        : { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    return new Intl.NumberFormat(undefined, options).format(cents / 100);
}

/**
 * Splits `total` cents by weights so the parts add up exactly
 * (largest-remainder method - leftover cents go to the largest fractions).
 */
export function allocate(total: number, weights: number[]): number[] {
    const sum = weights.reduce((a, b) => a + b, 0);
    if (sum <= 0) return weights.map(() => 0);
    const raw = weights.map((w) => (total * w) / sum);
    const parts = raw.map(Math.floor);
    let left = total - parts.reduce((a, b) => a + b, 0);
    const order = raw.map((r, i) => ({ i, frac: r - Math.floor(r) })).sort((a, b) => b.frac - a.frac);
    for (let k = 0; left > 0; k++, left--) parts[order[k % order.length].i] += 1;
    return parts;
}
