"use client";

import { useEffect } from "react";

/** Opens the print dialog (Save as PDF) once fonts and the photo are ready */
export default function AutoPrint() {
    useEffect(() => {
        const ready = () => document.fonts.ready.then(() => window.print());
        if (document.readyState === "complete") ready();
        else window.addEventListener("load", ready, { once: true });
        return () => window.removeEventListener("load", ready);
    }, []);
    return null;
}
