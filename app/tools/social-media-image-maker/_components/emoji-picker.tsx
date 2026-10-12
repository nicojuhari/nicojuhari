"use client";

import { useEffect, useRef } from "react";

/** Full searchable emoji keyboard (emoji-picker-element), loaded only when opened */
export default function EmojiPicker({ onPick }: { onPick: (emoji: string) => void }) {
    const boxRef = useRef<HTMLDivElement>(null);
    const pickRef = useRef(onPick);
    useEffect(() => {
        pickRef.current = onPick;
    });

    useEffect(() => {
        let picker: HTMLElement | null = null;
        let cancelled = false;
        import("emoji-picker-element").then(({ Picker }) => {
            if (cancelled || !boxRef.current) return;
            picker = new Picker();
            // The site is light only - don't follow the OS dark mode
            picker.classList.add("light");
            picker.style.width = "100%";
            picker.style.height = "320px";
            picker.style.setProperty("--border-size", "0");
            picker.addEventListener("emoji-click", (e) => {
                const unicode = (e as CustomEvent<{ unicode?: string }>).detail.unicode;
                if (unicode) pickRef.current(unicode);
            });
            boxRef.current.append(picker);
        });
        return () => {
            cancelled = true;
            picker?.remove();
        };
    }, []);

    return <div ref={boxRef} className="min-h-80" />;
}
