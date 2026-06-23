import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Playground - Frontend Experiments & Demos | Nicojuhari",
    description:
        "A collection of small, interactive front-end experiments built with JavaScript, React, and CSS. Fun stuff to explore ideas and try new techniques.",
    alternates: { canonical: "https://nicojuhari.com/playground" },
};

const PROJECTS = [
    {
        href: "/playground/rain-of-emojis",
        icon: "🎉",
        title: "Rain of Emojis",
        desc: "CSS animations and JavaScript",
    },
    {
        href: "/playground/magic-wand",
        icon: "✨",
        title: "Magic Wand Sparkles",
        desc: "Click to create the magic",
    },
];

export default function PlaygroundPage() {
    return (
        <div className="container-sm py-12">
            <h1 className="text-3xl font-bold text-center mb-2">Playground</h1>
            <p className="text-center text-muted-foreground mb-10">Small experiments, big fun.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {PROJECTS.map((p) => (
                    <Link
                        key={p.href}
                        href={p.href}
                        className="flex items-center gap-4 p-5 border rounded-xl bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                        <span className="text-4xl">{p.icon}</span>
                        <div>
                            <h3 className="font-bold">{p.title}</h3>
                            <p className="text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
