"use client";

import { useState } from "react";
import FilterPills from "@/app/_components/filter-pills";
import ToolTile, { ToolPromoTile } from "@/app/_components/tool-tile";
import type { Tool, ToolCategory } from "@/app/_data/tools";
import { toolFilterLabel } from "@/app/_data/tools";

type FilterId = "all" | ToolCategory;

export default function ToolsFilter({ tools }: { tools: Tool[] }) {
    const [active, setActive] = useState<FilterId>("all");

    const categories = (Object.keys(toolFilterLabel) as ToolCategory[]).filter((c) => tools.some((t) => t.category === c));
    const filters = [
        { id: "all" as FilterId, label: "All tools", count: tools.length },
        ...categories.map((c) => ({
            id: c as FilterId,
            label: toolFilterLabel[c],
            count: tools.filter((t) => t.category === c).length,
        })),
    ];

    // Group by category so the "All" view reads business → text → everyday
    const ordered = categories.flatMap((c) => tools.filter((t) => t.category === c));
    const visible = active === "all" ? ordered : ordered.filter((t) => t.category === active);

    return (
        <div className="flex flex-col gap-5 sm:gap-6">
            <FilterPills filters={filters} active={active} onChange={setActive} label="Filter tools by category" />

            <ul className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                {visible.map((tool) => (
                    <li key={tool.slug} className="min-w-0">
                        <ToolTile tool={tool} />
                    </li>
                ))}
                <li className="min-w-0">
                    <ToolPromoTile
                        href="/services/custom-web-apps"
                        eyebrow="Custom tools"
                        title="Need a tool built for your business?"
                        description="Calculators, dashboards and internal tools, built around your process."
                        linkLabel="See custom web apps"
                    />
                </li>
            </ul>
        </div>
    );
}
