import Link from "next/link";
import { Stats } from "../_components/visuals";
import type { Note } from "./types";

// Math: 10 min × 20 times/week = 200 min ≈ 3.3 h/week; × 46 working weeks ≈ 153 h/year ≈ 19 eight-hour days. Example task, not a client case.
export const smallTasksAddUp: Note = {
    slug: "small-tasks-add-up",
    title: "How a 10-minute task turns into 19 workdays a year",
    description:
        "A 10-minute task done 20 times a week adds up to about 19 workdays a year. Small tasks feel cheap because nobody adds them up.",
    date: "2026-11-04",
    tag: "business",
    draft: true,
    body: (
        <>
            <p>Copying a new order into the invoice tool takes about 10 minutes.</p>
            <p>Nobody minds. It&apos;s quick.</p>
            <p>But it happens 20 times a week. That&apos;s more than 3 hours a week, every week.</p>

            <Stats
                items={[
                    { value: "10 min", label: "one time" },
                    { value: "3 hours", label: "every week" },
                    { value: "19 days", label: "every year" },
                ]}
            />

            <h2>Why nobody counts it</h2>
            <p>A big task gets noticed. Someone complains, and it gets fixed.</p>
            <p>A small task feels too short to matter. So it stays.</p>
            <p>
                <strong>Small tasks feel cheap because nobody adds them up.</strong>
            </p>
            <p>19 workdays is almost a month. A month of copying the same data from one place to another.</p>

            <h2>How to count your own</h2>
            <ol>
                <li>
                    <strong>Pick one task</strong> your team does many times a week.
                </li>
                <li>
                    <strong>Time it once</strong>, from start to finish.
                </li>
                <li>
                    <strong>Count how often</strong> it happens in a normal week.
                </li>
                <li>
                    <strong>Multiply</strong> the minutes by the times a week, then by 46 working weeks.
                </li>
            </ol>
            <p>Sometimes the number is small. Then the task can stay as it is.</p>
            <p>
                When the number is big, a tool can often do the copying for you. That&apos;s what{" "}
                <Link href="/services/custom-web-apps">apps and automations</Link> are for.
            </p>
        </>
    ),
};
