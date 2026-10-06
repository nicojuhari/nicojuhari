/**
 * Business facts for the imprint, privacy policy and terms.
 * Keep them identical to the trade licence (Gewerbeschein), invoices and the Google Business Profile.
 */
export const LEGAL = {
    name: "Nicolae Cojuhari",
    tradingAs: "Nicojuhari",
    form: "Sole trader (Einzelunternehmen)",
    /** The imprint must show a full geographic address (§ 5 ECG), even if it's hidden on Google Maps */
    street: "Kurt-Tichy-Gasse 5",
    postcode: "1100",
    city: "Vienna",
    country: "Austria",
    email: "contact@nicojuhari.com",
    phone: "+43 690 10196811",
    purpose: "Web design, software development and online marketing services",
    tradeLicence: "Dienstleistungen in der automatischen Datenverarbeitung und Informationstechnik",
    tradeAuthority: "Magistratisches Bezirksamt für den 10. Bezirk, Vienna",
    chamber: "Wirtschaftskammer Wien (Austrian Economic Chamber, Vienna), UBIT section",
    /** Kleinunternehmer: no VAT on invoices */
    vat: "Small business exempt from VAT under § 6 (1) 27 UStG",
    lastUpdated: "6 October 2026",
} as const;

export const legalAddress = `${LEGAL.street}, ${LEGAL.postcode} ${LEGAL.city}, ${LEGAL.country}`;
