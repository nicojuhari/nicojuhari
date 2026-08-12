import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="section-band relative overflow-hidden pt-12 sm:pt-16">
            <div className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden />

            <div className="mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[6fr_5fr]">
                <div>
                    <p className="eyebrow inline-flex items-center gap-2">
                        <span className="size-1.5 rounded-full bg-brand-green" aria-hidden />
                        Nick · Software Engineer
                    </p>

                    <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-ink">
                        <span className="block motion-safe:animate-[hero-rise_0.7s_ease-out_both]">
                            Finance-fluent software engineer.
                        </span>
                        <span className="mt-2 block text-[0.55em] font-medium leading-[1.15] tracking-tight text-ink-muted motion-safe:animate-[hero-rise_0.7s_ease-out_0.12s_both]">
                            Fintech, AI &amp; secure business systems.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-xl text-[1.125rem] leading-[1.6] text-ink-muted">
                        <span className="font-medium text-ink">15 years inside a consumer credit company.</span> A finance
                        degree. Full-stack engineering. I build software that understands the business problem - and ships
                        it securely, with AI where it earns its place.
                    </p>

                    <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link
                            href="#contact"
                            className="group inline-flex items-center gap-1.5 rounded-full bg-brand px-6 py-3 text-[14px] font-medium text-white transition-[transform,background-color] duration-200 hover:bg-brand/90 active:scale-[0.97]"
                        >
                            Open to full-time roles
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                                →
                            </span>
                        </Link>
                        <Link
                            href="#services"
                            className="group inline-flex items-center gap-1.5 text-[14px] font-medium text-ink transition-colors hover:text-brand-green"
                        >
                            Select consulting projects
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                                →
                            </span>
                        </Link>
                    </div>

                    <p className="mt-10 font-mono text-[14px] text-ink-muted">Vienna · Replies within 24h · M–F</p>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="overflow-hidden rounded-3xl border border-rule bg-bg-soft">
                        <Image
                            src="/nick-profile-photo.webp"
                            alt="Nicolae Cojuhari - finance-fluent software engineer"
                            title="Nicolae Cojuhari"
                            width={640}
                            height={800}
                            priority
                            className="aspect-4/5 w-full object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
