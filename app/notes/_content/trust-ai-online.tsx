import type { Note } from "./types";

export const trustOnlineAi: Note = {
    slug: "trust-ai-online",
    title: "Can you still trust what you read online?",
    description:
        "Less than before. Making a fake now takes seconds. Checking it still takes the same time it always did, and that gap is the problem.",
    date: "2026-11-02",
    tag: "ai",
    draft: false,
    body: (
        <>
            <p>Less than before.</p>
            <p>A fake photo used to take a skilled person a whole day. Now anyone can make one in ten seconds.</p>
            <p>But checking if it&apos;s real still takes the same time as always.</p>
            <p>
                <strong>Making things got fast. Checking them didn&apos;t.</strong>
            </p>
            <p>So there is more and more stuff online that nobody checked. Not because people are bad. Because checking is slow.</p>
            <p>AI doesn&apos;t make us smart. We still need to be smart enough to see what AI made.</p>

            <h2>A few simple checks</h2>
            <ul>
                <li>
                    <strong>Who made it?</strong> A real name, a date, earlier work you can look at.
                </li>
                <li>
                    <strong>Where did it start?</strong> The first source, not a repost of a repost.
                </li>
                <li>
                    <strong>Look closely.</strong> In images and videos: hands, text, shadows, faces that move in a strange way.
                </li>
                <li>
                    <strong>Does it rush you?</strong> If it wants you angry or scared right now, slow down.
                </li>
            </ul>

            <h2>Maybe it&apos;s time to read more books</h2>
            <p>A book takes months or years to write. Someone else checks it before it&apos;s printed.</p>
            <p>It&apos;s slow. And right now, slow might be the good part.</p>
        </>
    ),
};
