import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Designer from "./_components/designer";
import { SIZES } from "./_components/data";
import ToolPageShell from "@/app/_components/tool-page-shell";
import { webAppSchema } from "@/app/_lib/schema";
import { pageMetadata } from "@/app/_lib/metadata";

const DESCRIPTION = "A simple Canva alternative for quick social posts. Make Instagram, LinkedIn, X and YouTube images in the exact size. No login, no watermark.";

export const metadata: Metadata = pageMetadata({
    title: "Social Media Image Maker - Simple Canva Alternative, No Login",
    description: DESCRIPTION,
    path: "/tools/social-media-image-maker",
});

const tips = [
    {
        label: "Quick",
        title: "One image, done in minutes",
        text: "Pick a template - quote, sale, announcement, event, testimonial, tip, story or thumbnail - change the words and download. No project to set up.",
    },
    {
        label: "Sizes",
        title: "The exact size, every time",
        text: "Pick the platform and the canvas is set for you. The file you download has exactly those pixels, so the platform doesn’t crop or blur it.",
    },
    {
        label: "Private",
        title: "Your photos stay on your device",
        text: "Everything happens in your browser. Nothing is uploaded, and your last design is still here when you come back.",
    },
];

const goodFit = [
    "You need one image for a post today",
    "You don’t want to make an account or log in",
    "You want the exact size for each platform",
    "You want a clean download, with no watermark",
];

const biggerTool = ["You make videos, presentations or print designs", "A team works on the same designs", "You need a large library of stock photos and elements"];

const steps = [
    {
        title: "Pick the size",
        text: "Choose the platform - Instagram, Story, Facebook, X, LinkedIn, YouTube or Pinterest - or type your own size.",
    },
    {
        title: "Add your content",
        text: "Add text in a Google font, a photo, an icon or an emoji. Or start from a template and change the words.",
    },
    {
        title: "Download or copy",
        text: "Download a PNG or JPEG, or copy the image and paste it straight into your post.",
    },
];

/** "1:1", "4:5" - or "1.91:1" when the numbers don't reduce nicely */
function ratio(w: number, h: number) {
    const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
    const d = gcd(w, h);
    return w / d <= 20 && h / d <= 20 ? `${w / d}:${h / d}` : `${Number((w / h).toFixed(2))}:1`;
}

const faq = [
    {
        question: "Is this a Canva alternative?",
        answer: "For simple social posts, yes. It’s made for one quick image in the right size: pick a template, change the text, download. No account and no watermark. For bigger design work - video, presentations, print or a team - Canva does much more.",
    },
    {
        question: "Do I need to log in or create an account?",
        answer: "No. Open the page and start. There’s no login, no watermark and no download limit, and the image you download is exactly what you see on the canvas.",
    },
    {
        question: "What size should a social media image be?",
        answer: "Instagram posts are 1080 × 1080 px (or 1080 × 1350 for portrait), Stories and Reels 1080 × 1920, Facebook and LinkedIn link posts about 1200 × 630, X posts 1600 × 900, YouTube thumbnails 1280 × 720 and Pinterest pins 1000 × 1500. Pick the platform here and the size is set for you.",
    },
    {
        question: "Are my photos uploaded anywhere?",
        answer: "No. Your photos and text stay in your browser. The fonts load from Google Fonts, but your design never leaves your device.",
    },
    {
        question: "Should I download PNG or JPEG?",
        answer: "PNG keeps text and graphics sharpest. JPEG makes smaller files and is good for photos. WebP is small and sharp, and works best on websites.",
    },
    {
        question: "Can I reuse a design for my next post?",
        answer: "Yes. Save it as a preset and it’s here next time. Download the preset as a .json file to keep a copy or open it on another computer.",
    },
    {
        question: "Does it work on my phone?",
        answer: "Yes, it works in a phone browser. Moving and resizing things is easier with a mouse, so a computer is faster for bigger designs.",
    },
];

export default function SocialImageMakerPage() {
    return (
        <ToolPageShell
            currentSlug="social-media-image-maker"
            title="Social Media Image Maker"
            description="A simple Canva alternative for quick posts. Pick the size, add your text and photo, download. No login, no watermark."
            perks={["Free", "No login", "No watermark", "No uploads"]}
            schema={webAppSchema("Social Media Image Maker", DESCRIPTION, "social-media-image-maker", "DesignApplication")}
            tips={tips}
            faq={faq}
            bare
            guide={
                <div className="flex flex-col gap-12 sm:gap-16">
                    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                        <div className="flex flex-col gap-2">
                            <p className="eyebrow">When to use it</p>
                            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">A simple Canva alternative for quick posts</h2>
                        </div>
                        <div className="grid gap-3 md:grid-cols-2">
                            <div className="flex flex-col gap-3 rounded-[20px] border border-rule bg-white p-5.5">
                                <h3 className="text-base font-semibold text-ink">Use this tool when</h3>
                                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-muted">
                                    {goodFit.map((item) => (
                                        <li key={item} className="flex gap-2.5">
                                            <Check className="mt-0.5 size-4 shrink-0 text-teal" strokeWidth={2.4} aria-hidden />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col gap-3 rounded-[20px] border border-rule bg-[#faf9f6] p-5.5">
                                <h3 className="text-base font-semibold text-ink">Use Canva or another full design app when</h3>
                                <ul className="flex flex-col gap-2 text-sm leading-relaxed text-ink-muted">
                                    {biggerTool.map((item) => (
                                        <li key={item} className="flex gap-2.5">
                                            <ArrowRight className="mt-0.5 size-4 shrink-0 text-ink-faint" aria-hidden />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                        <div className="flex flex-col gap-2">
                            <p className="eyebrow">How to</p>
                            <h2 className="text-2xl font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">How to make a social media image</h2>
                        </div>
                        <div className="flex flex-col gap-8">
                            <ol className="grid gap-3 md:grid-cols-3">
                                {steps.map((step, i) => (
                                    <li key={step.title} className="flex flex-col gap-2.5 rounded-[20px] border border-rule bg-white p-5.5">
                                        <span className="font-mono text-xs font-semibold text-teal">{String(i + 1).padStart(2, "0")}</span>
                                        <h3 className="text-base font-semibold text-ink">{step.title}</h3>
                                        <p className="text-sm leading-relaxed text-ink-muted">{step.text}</p>
                                    </li>
                                ))}
                            </ol>

                            <div className="flex flex-col gap-3">
                                <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Social media image sizes</h2>
                                <div className="overflow-x-auto rounded-[20px] border border-rule bg-white">
                                    <table className="w-full min-w-[420px] text-left text-sm">
                                        <thead className="border-b border-rule bg-[#faf9f6] text-[13px] text-ink-muted">
                                            <tr>
                                                <th scope="col" className="px-5 py-3 font-semibold">
                                                    Format
                                                </th>
                                                <th scope="col" className="px-5 py-3 font-semibold">
                                                    Size in pixels
                                                </th>
                                                <th scope="col" className="px-5 py-3 font-semibold">
                                                    Shape
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-rule">
                                            {SIZES.map((s) => (
                                                <tr key={s.id}>
                                                    <th scope="row" className="px-5 py-3 font-medium text-ink">
                                                        {s.label}
                                                    </th>
                                                    <td className="px-5 py-3 text-ink-soft tabular-nums">
                                                        {s.width} × {s.height}
                                                    </td>
                                                    <td className="px-5 py-3 text-ink-muted tabular-nums">{ratio(s.width, s.height)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <Link
                                href="/services/local-business-websites"
                                className="group inline-flex items-center gap-1.5 self-start text-sm font-semibold text-brand transition-colors hover:text-teal"
                            >
                                Your posts bring people to your website. Make sure it turns them into customers
                                <ArrowRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
                            </Link>
                        </div>
                    </section>
                </div>
            }
        >
            <Designer />
        </ToolPageShell>
    );
}
