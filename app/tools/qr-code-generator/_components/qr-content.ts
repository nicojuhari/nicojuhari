export type ContentType = "url" | "text" | "wifi" | "email" | "phone" | "contact";

export type ContentFields = {
    url: string;
    text: string;
    wifiName: string;
    wifiPassword: string;
    wifiSecurity: "WPA" | "WEP" | "nopass";
    wifiHidden: boolean;
    email: string;
    emailSubject: string;
    emailBody: string;
    phone: string;
    firstName: string;
    lastName: string;
    company: string;
    contactPhone: string;
    contactEmail: string;
    website: string;
};

export const EMPTY_FIELDS: ContentFields = {
    url: "https://nicojuhari.com",
    text: "",
    wifiName: "",
    wifiPassword: "",
    wifiSecurity: "WPA",
    wifiHidden: false,
    email: "",
    emailSubject: "",
    emailBody: "",
    phone: "",
    firstName: "",
    lastName: "",
    company: "",
    contactPhone: "",
    contactEmail: "",
    website: "",
};

export const CONTENT_TYPES: { id: ContentType; label: string }[] = [
    { id: "url", label: "Link" },
    { id: "text", label: "Text" },
    { id: "wifi", label: "Wi-Fi" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "contact", label: "Contact" },
];

/** Field id → message */
export type FieldErrors = Partial<Record<keyof ContentFields, string>>;

export type Encoded = {
    /** What goes into the QR code; empty when there is nothing valid to encode yet */
    data: string;
    errors: FieldErrors;
    /** Short human-readable line shown under the preview */
    summary: string;
};

/** Byte-mode capacity at error-correction level Q (version 40) */
export const MAX_BYTES_Q = 1663;
/** Byte-mode capacity at level H - used when a logo covers part of the code */
export const MAX_BYTES_H = 1273;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9 ()./-]{5,}$/;

export function byteLength(value: string) {
    return new TextEncoder().encode(value).length;
}

/** Adds https:// when the scheme is missing and checks the result is a real web address */
export function normalizeUrl(raw: string): { url: string; error?: string } {
    const value = raw.trim();
    if (!value) return { url: "" };
    const hasScheme = /^[a-z][a-z0-9+.-]*:/i.test(value);
    const candidate = hasScheme ? value : `https://${value}`;
    try {
        const parsed = new URL(candidate);
        const isWeb = parsed.protocol === "http:" || parsed.protocol === "https:";
        if (isWeb && !parsed.hostname.includes(".") && parsed.hostname !== "localhost") {
            return { url: "", error: "Enter a full address, like example.com" };
        }
        return { url: candidate };
    } catch {
        return { url: "", error: "This doesn’t look like a web address" };
    }
}

/** Escapes \ ; , : " for Wi-Fi and vCard fields */
function escapeField(value: string) {
    return value.replace(/([\\;,:"])/g, "\\$1");
}

function cleanPhone(value: string) {
    return value.replace(/[^\d+]/g, "");
}

export function encodeContent(type: ContentType, f: ContentFields): Encoded {
    const errors: FieldErrors = {};

    switch (type) {
        case "url": {
            const { url, error } = normalizeUrl(f.url);
            if (error) errors.url = error;
            return { data: url, errors, summary: url };
        }
        case "text": {
            const text = f.text.trim();
            return { data: text, errors, summary: text.split("\n")[0] ?? "" };
        }
        case "wifi": {
            const name = f.wifiName.trim();
            if (!name) return { data: "", errors, summary: "" };
            if (f.wifiSecurity !== "nopass" && !f.wifiPassword) errors.wifiPassword = "Add the network password";
            if (f.wifiSecurity === "WPA" && f.wifiPassword && f.wifiPassword.length < 8) {
                errors.wifiPassword = "WPA passwords are at least 8 characters";
            }
            if (Object.keys(errors).length) return { data: "", errors, summary: "" };
            const password = f.wifiSecurity === "nopass" ? "" : `P:${escapeField(f.wifiPassword)};`;
            const hidden = f.wifiHidden ? "H:true;" : "";
            return {
                data: `WIFI:T:${f.wifiSecurity};S:${escapeField(name)};${password}${hidden};`,
                errors,
                summary: `Wi-Fi · ${name}`,
            };
        }
        case "email": {
            const email = f.email.trim();
            if (!email) return { data: "", errors, summary: "" };
            if (!EMAIL_RE.test(email)) {
                errors.email = "Enter a valid email address";
                return { data: "", errors, summary: "" };
            }
            const params = new URLSearchParams();
            if (f.emailSubject.trim()) params.set("subject", f.emailSubject.trim());
            if (f.emailBody.trim()) params.set("body", f.emailBody.trim());
            // URLSearchParams encodes spaces as "+", which mail apps show literally
            const query = params.toString().replace(/\+/g, "%20");
            return { data: `mailto:${email}${query ? `?${query}` : ""}`, errors, summary: email };
        }
        case "phone": {
            const phone = f.phone.trim();
            if (!phone) return { data: "", errors, summary: "" };
            if (!PHONE_RE.test(phone)) {
                errors.phone = "Use digits, spaces and an optional + country code";
                return { data: "", errors, summary: "" };
            }
            return { data: `tel:${cleanPhone(phone)}`, errors, summary: phone };
        }
        case "contact": {
            const first = f.firstName.trim();
            const last = f.lastName.trim();
            if (!first && !last) return { data: "", errors, summary: "" };
            if (f.contactEmail.trim() && !EMAIL_RE.test(f.contactEmail.trim())) errors.contactEmail = "Enter a valid email address";
            if (f.contactPhone.trim() && !PHONE_RE.test(f.contactPhone.trim())) {
                errors.contactPhone = "Use digits, spaces and an optional + country code";
            }
            const site = f.website.trim() ? normalizeUrl(f.website) : { url: "" };
            if (site.error) errors.website = site.error;
            if (Object.keys(errors).length) return { data: "", errors, summary: "" };

            const fullName = [first, last].filter(Boolean).join(" ");
            const lines = [
                "BEGIN:VCARD",
                "VERSION:3.0",
                `N:${escapeField(last)};${escapeField(first)};;;`,
                `FN:${escapeField(fullName)}`,
                f.company.trim() && `ORG:${escapeField(f.company.trim())}`,
                f.contactPhone.trim() && `TEL;TYPE=CELL:${cleanPhone(f.contactPhone)}`,
                f.contactEmail.trim() && `EMAIL:${f.contactEmail.trim()}`,
                site.url && `URL:${site.url}`,
                "END:VCARD",
            ].filter(Boolean);
            return { data: lines.join("\n"), errors, summary: fullName };
        }
    }
}

// ─── Colour contrast ──────────────────────────────────────────────────────────

function luminance(hex: string) {
    const value = hex.replace("#", "");
    const channels = [0, 2, 4].map((i) => parseInt(value.slice(i, i + 2), 16) / 255);
    const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

/** Returns a warning when the code may not scan reliably */
export function scanWarning(colors: { dot: string; corner: string; cornerDot: string; bg: string }, transparent: boolean) {
    if (transparent) {
        return luminance(colors.dot) > 0.4 ? "Light dots on a transparent background may not scan on white paper." : "";
    }
    const weakest = Math.min(
        contrastRatio(colors.dot, colors.bg),
        contrastRatio(colors.corner, colors.bg),
        contrastRatio(colors.cornerDot, colors.bg)
    );
    if (weakest < 3) return "Low contrast - this code may not scan. Use darker dots or a lighter background.";
    if (luminance(colors.dot) > luminance(colors.bg)) {
        return "Light dots on a dark background don’t scan on every phone. Dark on light is safest.";
    }
    return "";
}
