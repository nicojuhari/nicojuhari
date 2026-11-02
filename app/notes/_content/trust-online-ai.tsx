import { Link2, ScanSearch, Timer, UserCheck } from "lucide-react";
import { Steps } from "../_components/visuals";
import type { Note } from "./types";

export const trustOnlineAi: Note = {
    slug: "trust-online-ai",
    title: "Can you still trust what you read online?",
    description:
        "Less than before. AI makes text, images and videos cheap to produce. We need to get better at filtering, and stay the users of AI.",
    date: "2026-11-02",
    tag: "ai",
    draft: false,
    body: (
        <>
            <p>
                Less than before. AI makes text, images and videos cheap and fast to produce. So a lot of content is now made for
                quantity, not quality. If we don&apos;t check what we read and watch, it&apos;s easy to get fooled.
            </p>
            <p>
                I use AI every day, for code and for writing. It saves me time. But I read everything it gives me before I use it.
            </p>
            <p>
                <strong>AI doesn&apos;t make us smart. We need to be smart enough to see what AI made.</strong> We should stay the users of
                AI.
            </p>

            <h2>What I check before I believe something</h2>
            <Steps
                items={[
                    { title: "Who made it?", text: "A real name, a date, a history of earlier work.", icon: UserCheck },
                    { title: "Where did it start?", text: "The original source, not a repost of a repost.", icon: Link2 },
                    { title: "Look closely", text: "In images and videos: hands, text, shadows, faces that move in a strange way.", icon: ScanSearch },
                    { title: "Does it rush me?", text: "If it wants me angry or scared right now, I slow down.", icon: Timer },
                ]}
            />

            <h2>A good time to read books</h2>
            <p>
                A book takes someone months or years to write, and someone else checks it before it&apos;s printed. It&apos;s slow, and
                that&apos;s the point. I think now is a better time than ever to read more books.
            </p>
            <p>
                The new skill isn&apos;t only using AI. It&apos;s knowing when something was made by AI, and checking before you believe it
                or share it.
            </p>
        </>
    ),
};
