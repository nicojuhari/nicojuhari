import Link from "next/link";
import { tools } from "@/app/_data/tools";
import ToolCard from "./tool-card";

type Props = {
    currentSlug: string;
    title: string;
    description: string;
    schema?: object;
    children: React.ReactNode;
    notes?: React.ReactNode;
};

export default function ToolPageShell({ currentSlug, title, description, schema, children, notes }: Props) {
    const otherTools = tools.filter((tool) => tool.slug !== currentSlug);

    return (
        <div>
            {schema && (
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            )}

            <header className="mb-6">
                <h1 className="text-[clamp(1.75rem,3vw,2.25rem)] font-semibold tracking-tight text-ink">{title}</h1>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-muted">{description}</p>
            </header>

            <div className="surface-card overflow-hidden p-5 sm:p-6 lg:p-8">{children}</div>

            {notes && <div className="mt-8 max-w-2xl space-y-3 text-sm text-ink-muted">{notes}</div>}

            <section className="mt-12">
                <div className="mb-4 flex items-end justify-between gap-4">
                    <p className="eyebrow mb-0">More tools</p>
                    <Link href="/tools" className="text-xs font-medium text-ink-muted transition-colors hover:text-ink">
                        All tools →
                    </Link>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2">
                    {otherTools.map((tool) => (
                        <li key={tool.slug}>
                            <ToolCard tool={tool} />
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
}
