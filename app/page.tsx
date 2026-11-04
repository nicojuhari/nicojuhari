import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChartLine, Check, MessageCircle, Phone, Search } from "lucide-react";
import CtaSection from "./_components/cta-section";
import { serviceIcons } from "./_components/icons";
import { services, whatsappLink } from "./_data/services";
import { tools } from "./_data/tools";
import { homeSchema } from "./_lib/schema";
import { pageMetadata } from "./_lib/metadata";
import { SITE_DESCRIPTION, SITE_TITLE } from "./_lib/site";

export const metadata: Metadata = pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/" });

const SEND_TEXT = "Hi Nick, please take a look at my website: ";

/** The customer path the hero card shows; the last step is highlighted */
const flow = [
    { icon: Search, title: "People find you", text: "On Google, Google Maps and your ads" },
    { icon: Phone, title: "They call, book or order", text: "One tap, on any phone" },
    { icon: MessageCircle, title: "You reply fast", text: "Automatic replies and follow-ups" },
    { icon: ChartLine, title: "You see what came in", text: "Calls, bookings and orders from each source" },
];

const results = [
    { stat: "95%+", title: "of clients come from the website and Google Maps", note: "A handyman business in Vienna that I co-own." },
    { stat: "Every day", title: "a lending company runs on a system I built", note: "A consumer credit company I co-founded." },
    { stat: "EPUfix", title: "my own business runs on this app", note: "Invoices, income and expenses for the self-employed in Austria." },
];

const steps = [
    {
        title: "A free first look",
        text: "I try your website like a customer, from the first click to your reply. You get the first thing I’d fix.",
    },
    { title: "Build and fix", text: "A fixed price, agreed before I start. You pay in stages, after each part is done." },
    { title: "Count and improve", text: "Each month you see the calls, bookings or orders. I keep improving what works, if you want." },
];

export default function Home() {
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema()) }} />

            {/* Hero */}
            <section className="container mt-8 grid items-center gap-10 sm:mt-14 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col gap-6 sm:gap-7">
                    <p className="inline-flex items-center gap-2.5 self-start rounded-full border border-ink/10 bg-white px-3.5 py-1.5 text-[13px] font-medium text-ink-muted sm:text-sm">
                        <span className="relative size-2" aria-hidden>
                            <span className="absolute inset-0 rounded-full bg-teal motion-safe:animate-[ping-soft_2.4s_ease-in-out_infinite]" />
                            <span className="absolute inset-0 rounded-full bg-teal" />
                        </span>
                        For small businesses
                    </p>
                    <h1 className="text-[44px] leading-[1.02] font-semibold tracking-[-0.04em] text-ink sm:text-[60px] xl:text-[72px]">
                        More customers.
                        <br />
                        <span className="text-ink-muted">Less manual work.</span>
                    </h1>
                    <p className="max-w-[520px] text-lg leading-normal text-[#4a4f57] sm:text-xl">
                        Websites and apps that bring calls, bookings and orders. Tested in my own businesses first.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <a
                            href={whatsappLink(SEND_TEXT)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-pill-primary h-13 px-6.5 text-base sm:h-14 sm:text-[17px]"
                        >
                            Send your website link
                            <ArrowRight className="size-[18px]" aria-hidden />
                        </a>
                        <a
                            href="#services"
                            className="inline-flex h-13 items-center justify-center rounded-full border border-ink/15 px-6 text-base font-semibold text-ink transition-colors hover:bg-ink/5 sm:h-14 sm:text-[17px]"
                        >
                            See what I do
                        </a>
                    </div>
                    <div className="flex items-center gap-3">
                        <Image
                            src="/nick-profile-photo.webp"
                            alt=""
                            width={80}
                            height={80}
                            className="size-10 rounded-full object-cover ring-3 ring-white"
                        />
                        <p className="text-sm leading-snug text-[#4a4f57] sm:text-[15px]">
                            <span className="font-semibold text-ink">Free first look.</span> I reply within 24 hours
                            <br className="hidden sm:block" /> with the first thing I’d fix.
                        </p>
                    </div>
                </div>

                <div className="relative flex flex-col gap-5 overflow-hidden rounded-[24px] bg-brand p-5.5 text-white sm:rounded-[28px] sm:p-10">
                    <span className="absolute -top-20 -right-20 size-64 rounded-full bg-[#1d3463]" aria-hidden />
                    <p className="relative text-xs font-semibold tracking-[0.08em] text-[#b9c3dc] uppercase sm:text-[13px]">
                        One system, from first click to sale
                    </p>
                    <ol className="relative flex flex-col gap-2.5 sm:gap-3.5">
                        <span className="absolute top-7 bottom-7 left-[26px] w-0.5 bg-[#2c4377]" aria-hidden>
                            <span className="absolute -left-1 -mt-[5px] size-2.5 rounded-full bg-brand-rose motion-safe:animate-[flow_4.8s_cubic-bezier(.45,0,.55,1)_infinite]" />
                        </span>
                        {flow.map(({ icon: Icon, title, text }, i) => {
                            const last = i === flow.length - 1;
                            return (
                                <li
                                    key={title}
                                    className={`relative flex items-center gap-4 rounded-[16px] py-3 pr-4 pl-2.5 sm:rounded-[18px] sm:py-3.5 sm:pl-3 ${last ? "bg-white text-ink" : "bg-[#203868]"}`}
                                >
                                    <span
                                        className={`flex size-8 shrink-0 items-center justify-center rounded-[10px] ${last ? "bg-brand-rose text-white" : "bg-white text-brand"}`}
                                    >
                                        <Icon className="size-4" strokeWidth={2} aria-hidden />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-base font-semibold sm:text-[17px]">{title}</span>
                                        <span className={`text-[13px] sm:text-sm ${last ? "text-ink-muted" : "text-[#c3cbe0]"}`}>{text}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="container mt-16 flex scroll-mt-28 flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex max-w-[640px] flex-col gap-3">
                    <p className="eyebrow">What I do</p>
                    <h2 className="section-title">Two services. One goal: more sales.</h2>
                </div>
                <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
                    {services.map((service) => {
                        const Icon = serviceIcons[service.slug];
                        return (
                            <article
                                key={service.slug}
                                className="flex flex-col gap-6 rounded-[24px] p-6 sm:gap-7 sm:rounded-[28px] sm:p-11"
                                style={{ backgroundColor: service.tint }}
                            >
                                <div className="flex flex-col gap-3 sm:gap-3.5">
                                    <span
                                        className="flex size-12 items-center justify-center rounded-[14px] text-white sm:size-13 sm:rounded-2xl"
                                        style={{ backgroundColor: service.accent }}
                                    >
                                        <Icon className="size-6" strokeWidth={1.9} aria-hidden />
                                    </span>
                                    <p className="text-[13px] font-semibold opacity-80 sm:text-sm" style={{ color: service.ink }}>
                                        {service.label}
                                    </p>
                                    <h3
                                        className="text-[26px] leading-[1.12] font-semibold tracking-[-0.03em] sm:text-[32px]"
                                        style={{ color: service.ink }}
                                    >
                                        {service.title}
                                    </h3>
                                    <p className="text-[17px] leading-snug text-[#2c3440] sm:text-[19px]">{service.tagline}</p>
                                </div>
                                <ul className="flex flex-col gap-2.5 text-[15px] text-[#2c3440] sm:gap-3 sm:text-base">
                                    {service.highlights.map((item) => (
                                        <li key={item} className="flex gap-3">
                                            <Check
                                                className="mt-0.5 size-5 shrink-0"
                                                strokeWidth={2.4}
                                                style={{ color: service.accent }}
                                                aria-hidden
                                            />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <div
                                    className="mt-auto flex flex-col gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-between"
                                    style={{ borderColor: `color-mix(in srgb, ${service.accent} 15%, transparent)` }}
                                >
                                    {service.firstStep && (
                                        <span className="text-sm font-semibold sm:text-[15px]" style={{ color: service.ink }}>
                                            {service.firstStep.startsWith}
                                        </span>
                                    )}
                                    <Link
                                        href={service.href}
                                        className="inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
                                        style={{ backgroundColor: service.accent }}
                                    >
                                        Learn more
                                        <ArrowRight className="size-4" aria-hidden />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* Results */}
            <section id="results" className="mt-16 scroll-mt-28 bg-brand text-white sm:mt-24">
                <div className="container flex flex-col gap-8 py-14 sm:gap-12 sm:py-24">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div className="flex max-w-[640px] flex-col gap-3">
                            <p className="eyebrow text-[#f2a9c9]">Results</p>
                            <h2 className="section-title text-white">Tested in my own businesses first.</h2>
                        </div>
                        <p className="max-w-[380px] text-base leading-normal text-[#c3cbe0] sm:text-[17px]">
                            I run businesses on what I build. You get what already works.
                        </p>
                    </div>
                    <ul className="grid gap-3 md:grid-cols-3 md:gap-4">
                        {results.map((r) => (
                            <li key={r.stat} className="flex flex-col gap-2.5 rounded-[20px] bg-[#1f3561] p-6 sm:gap-3 sm:rounded-[24px] sm:p-8">
                                <p className="text-[44px] leading-none font-semibold tracking-[-0.04em] text-[#f2a9c9] sm:text-[56px]">{r.stat}</p>
                                <p className="text-[17px] leading-snug font-semibold sm:text-[19px]">{r.title}.</p>
                                <p className="mt-auto pt-2 text-sm text-[#c3cbe0] sm:text-[15px]">{r.note}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* How it works */}
            <section id="how" className="container mt-16 flex scroll-mt-28 flex-col gap-8 sm:mt-24 sm:gap-10">
                <div className="flex flex-col gap-3">
                    <p className="eyebrow">How it works</p>
                    <h2 className="section-title">Three simple steps.</h2>
                </div>
                <ol className="grid gap-3 md:grid-cols-3 md:gap-4">
                    {steps.map((step, i) => (
                        <li key={step.title} className="flex gap-4 rounded-[20px] bg-white p-5.5 sm:rounded-[24px] sm:p-8 md:flex-col md:gap-3.5">
                            <span className="text-[15px] font-bold text-teal">{String(i + 1).padStart(2, "0")}</span>
                            <span className="flex flex-col gap-1.5 md:gap-3">
                                <h3 className="text-[19px] font-semibold tracking-[-0.02em] text-ink sm:text-[22px]">{step.title}</h3>
                                <p className="text-[15px] leading-relaxed text-[#4a4f57] sm:text-base">{step.text}</p>
                            </span>
                        </li>
                    ))}
                </ol>
            </section>

            {/* About + tools */}
            <section className="container mt-16 grid gap-3 sm:mt-24 md:grid-cols-2 md:gap-5">
                <div className="flex flex-col gap-4 rounded-[24px] bg-[#f3e7ec] p-6 sm:gap-5 sm:rounded-[28px] sm:p-10">
                    <div className="flex items-center gap-4">
                        <Image src="/nick-profile-photo.webp" alt="Nick" width={128} height={128} className="size-14 rounded-full object-cover sm:size-16" />
                        <div className="flex flex-col">
                            <span className="text-[17px] font-semibold text-ink sm:text-lg">Hi, I’m Nick</span>
                            <span className="text-sm text-[#5b5560] sm:text-[15px]">Vienna, Austria</span>
                        </div>
                    </div>
                    <p className="text-base leading-relaxed text-[#2c2a30] sm:text-lg">
                        I build websites and apps, and I run businesses on them. I care about who calls and buys, not only how a site
                        looks.
                    </p>
                    <Link
                        href="/projects"
                        className="mt-auto inline-flex items-center gap-2 self-start py-2.5 text-[15px] font-semibold text-[#8c3a63] hover:underline"
                    >
                        See what I’ve built
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
                <div id="tools" className="flex flex-col gap-4 rounded-[24px] bg-white p-6 sm:gap-5 sm:rounded-[28px] sm:p-10">
                    <div className="flex flex-col gap-1.5">
                        <h2 className="text-[21px] font-semibold tracking-[-0.02em] text-ink sm:text-2xl">Free tools for everyday tasks</h2>
                        <p className="text-[15px] text-[#4a4f57] sm:text-base">No sign-up. They work in your browser.</p>
                    </div>
                    <ul className="flex flex-wrap gap-2">
                        {tools.slice(0, 6).map((tool) => (
                            <li key={tool.slug}>
                                <Link
                                    href={`/tools/${tool.slug}`}
                                    className="inline-flex h-10 items-center rounded-full bg-bg-soft px-3.5 text-sm font-medium text-ink transition-colors hover:bg-[#ece9e2]"
                                >
                                    {tool.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="/tools"
                        className="mt-auto inline-flex items-center gap-2 self-start py-2.5 text-[15px] font-semibold text-teal hover:underline"
                    >
                        All {tools.length} tools
                        <ArrowRight className="size-4" aria-hidden />
                    </Link>
                </div>
            </section>

            <div className="container mt-16 sm:mt-24">
                <CtaSection
                    title="Want more calls, bookings or orders?"
                    description="Send me your website link on WhatsApp. I’ll reply within 24 hours with the first thing I’d change."
                    whatsappText="Hi Nick, I’d like to talk about my business: "
                />
            </div>
        </>
    );
}
