import { cn } from "@/lib/utils";
import type { Proof } from "@/app/_data/services";

/** A real result from a business I run */
export default function ProofBlock({ proof, className }: { proof: Proof; className?: string }) {
    const external = proof.href?.startsWith("http");

    return (
        <section
            className={cn(
                "flex flex-col gap-3 rounded-[20px] border border-rule bg-white p-5.5 sm:flex-row sm:items-center sm:gap-8 sm:p-8",
                className
            )}
        >
            <span className="shrink-0 text-[40px] leading-none font-semibold tracking-[-0.03em] text-brand sm:text-[52px]">
                {proof.stat}
            </span>
            <div className="flex flex-col gap-1.5">
                <h2 className="text-lg font-semibold tracking-[-0.015em] text-ink">{proof.title}</h2>
                <p className="text-[15px] leading-relaxed text-ink-muted">
                    {proof.text}
                    {proof.href && proof.linkLabel && (
                        <>
                            {" "}
                            <a
                                href={proof.href}
                                target={external ? "_blank" : undefined}
                                rel={external ? "noopener noreferrer" : undefined}
                                className="font-semibold text-brand underline-offset-4 hover:underline"
                            >
                                {proof.linkLabel}
                            </a>
                        </>
                    )}
                </p>
            </div>
        </section>
    );
}
