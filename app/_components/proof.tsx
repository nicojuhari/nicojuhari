import Link from "next/link";

const outcomes = [
    "Reports from zero to instant",
    "Manual entry eliminated",
    "Whole team got access",
];

export default function Proof() {
    return (
        <section className="section-band section-rule bg-bg-soft" id="proof">
            <div className="mx-auto max-w-7xl">
                <header className="max-w-3xl">
                    <p className="eyebrow">Selected proof</p>
                    <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">
                        Replaced a lending company&apos;s Excel with real software.
                    </h2>
                    <p className="mt-4 max-w-2xl leading-[1.6] text-ink-muted">
                        A consumer finance team was running loans, clients, income, and expenses in one spreadsheet - one
                        person, one machine, no visibility. I built a multi-user web app around how they actually operate.
                    </p>
                </header>

                <ul className="mt-10 grid gap-4 sm:grid-cols-3">
                    {outcomes.map((item) => (
                        <li key={item} className="border-t border-rule pt-4 text-sm font-medium text-ink">
                            {item}
                        </li>
                    ))}
                </ul>

                <p className="mt-8 text-sm text-ink-muted">
                    Stack: Next.js · React · Node.js · MySQL · Tailwind -{" "}
                    <Link href="/projects" className="font-medium text-ink underline-offset-4 hover:underline">
                        More work
                    </Link>
                </p>
            </div>
        </section>
    );
}
