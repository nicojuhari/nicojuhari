import ContactButton from "./contact-button";

export default function AboutSection() {
    return (
        <section className="mt-10 sm:mt-12" aria-labelledby="about-heading">
            <h2 id="about-heading" className="eyebrow mb-4 sm:mb-5">
                About
            </h2>
            <div className="space-y-4 leading-relaxed text-ink-muted">
                <p>
                    I started in finance - a degree, then years working inside the industry. Later I switched to IT
                    because I like to build: solving real problems and automating workflows.
                </p>
                <p>
                    Today I build financial and business apps for web and mobile - plus business websites, landing
                    pages, and ecommerce / Shopify stores. AI is the tool I use most - for shipping faster, thinking
                    through problems, and making products smarter when it actually helps. Next.js, React, Supabase:
                    the stack I use day to day.
                </p>
                <p>
                    Outside of work I ski and play basketball. If you have a project and need someone who
                    understands both the numbers and the code,{" "}
                    <ContactButton className="inline font-medium text-ink underline-offset-4 hover:underline [&_span]:hidden">
                        let&apos;s work on it together
                    </ContactButton>
                    .
                </p>
                <p>
                    Favorite joke about development: what one developer can do in one week, two developers can do
                    in two weeks.
                </p>
                <p className="pt-1 text-ink">
                    Cheers,
                    <br />
                    Nick
                </p>
            </div>
        </section>
    );
}
